from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import Sequential, model_from_json
from tensorflow.keras.layers import Conv2D, MaxPooling2D, BatchNormalization, Flatten, Dense, Dropout, InputLayer
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
import numpy as np
import os
import traceback

app = Flask(__name__)
CORS(app)

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model_files")
TRAINING_DATA_DIR = os.path.join(BASE_DIR, "TrainingDataSet")
os.makedirs(MODEL_DIR, exist_ok=True)
MODEL_JSON_PATH = os.path.join(MODEL_DIR, "model.json")
MODEL_WEIGHTS_PATH = os.path.join(MODEL_DIR, "model.h5")

def load_trained_model():
    try:
        with open(MODEL_JSON_PATH, "r") as json_file:
            loaded_model_json = json_file.read()
        
        custom_objects = {
            'Sequential': Sequential,
            'InputLayer': InputLayer,
            'Conv2D': Conv2D,
            'MaxPooling2D': MaxPooling2D,
            'BatchNormalization': BatchNormalization,
            'Flatten': Flatten,
            'Dense': Dense,
            'Dropout': Dropout
        }
        loaded_model = model_from_json(loaded_model_json, custom_objects=custom_objects)
        loaded_model.load_weights(MODEL_WEIGHTS_PATH)
        loaded_model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
        return loaded_model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

# Load model on startup
model = load_trained_model()
labels = ["COVID", "Normal", "Pneumonia", "Tuberculosis"]

@app.route('/predict', methods=['POST'])
def predict():
    global model
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image provided"}), 400
    
    file = request.files['image']
    if not model:
        model = load_trained_model()
        if not model:
             return jsonify({"success": False, "message": "Model not loaded"}), 500

    try:
        # Save temp file
        temp_path = "temp_predict.jpg"
        file.save(temp_path)

        test_image = load_img(temp_path, target_size=(128, 128))
        test_image = img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis=0) / 255.0
        
        result = model.predict(test_image)
        predicted_index = np.argmax(result)
        predicted_label = labels[predicted_index]
        confidence = float(result[0][predicted_index])
        
        scores = {
            "covid": float(result[0][0]),
            "normal": float(result[0][1]),
            "pneumonia": float(result[0][2]),
            "tuberculosis": float(result[0][3])
        }

        os.remove(temp_path)

        return jsonify({
            "success": True, 
            "diagnosis": predicted_label, 
            "primaryConfidence": confidence,
            "confidenceScores": scores
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/train', methods=['POST'])
def train():
    try:
        data = request.json
        # Simple admin check (In production use proper auth)
        if data.get('password') != 'admin123':
             return jsonify({"success": False, "message": "Unauthorized"}), 401

        # Define Model Structure
        new_model = Sequential([
            Conv2D(32, (3,3), activation="relu", input_shape=(128, 128, 3)),
            MaxPooling2D((2,2)),
            BatchNormalization(),
            Conv2D(64, (3,3), activation="relu"),
            MaxPooling2D((2,2)),
            Flatten(),
            Dense(128, activation="relu"),
            Dropout(0.3),
            Dense(4, activation="softmax")
        ])
        new_model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
        
        # Check if dataset exists
        if not os.path.exists(TRAINING_DATA_DIR):
             return jsonify({"success": False, "message": "TrainingDataSet directory not found"}), 404

        train_datagen = ImageDataGenerator(rescale=1./255)
        training_set = train_datagen.flow_from_directory(
            TRAINING_DATA_DIR, 
            target_size=(128, 128), 
            batch_size=8, 
            class_mode="categorical"
        )
        
        new_model.fit(training_set, epochs=10)
        
        # Save Model
        with open(MODEL_JSON_PATH, "w") as json_file:
            json_file.write(new_model.to_json())
        new_model.save_weights(MODEL_WEIGHTS_PATH)
        
        # Reload global model
        global model
        model = new_model
        
        return jsonify({"success": True, "message": "Training Complete! Model Updated."})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
