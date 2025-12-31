# TensorFlow Model Conversion Instructions

This project requires a TensorFlow.js compatible model to function. Follow these steps to convert your existing Keras model (`model.h5`) to the required format.

## Prerequisites

You need to have Python and `tensorflowjs` installed on your machine.

1.  **Install the converter:**

    ```bash
    pip install tensorflowjs
    ```

## Conversion Process

1.  **Locate your trained model:**
    Ensure you have your `model.h5` file ready.

2.  **Run the conversion command:**
    Open your terminal/command prompt and run the following command. Replace `path/to/model.h5` with the actual path to your model file.

    ```bash
    tensorflowjs_converter --input_format=keras path/to/model.h5 backend/model
    ```

    **Explanation of arguments:**
    *   `--input_format=keras`: Specifies that the input model is a Keras H5 file.
    *   `path/to/model.h5`: The source model file.
    *   `backend/model`: The output directory where the converted files will be saved.

3.  **Verify Output:**
    After the command completes, check the `backend/model` directory. You should see:
    *   `model.json`: The model topology and manifest.
    *   `group1-shard1ofX.bin`: Binary weight files (there may be multiple shards).

## Integration

The backend is configured to automatically load the model from `backend/model/model.json`.

*   Ensure the directory structure matches:
    ```
    backend/
    └── model/
        ├── model.json
        └── group1-shard1of1.bin
    ```

*   **Important:** The model input shape is expected to be `(128, 128, 3)` and normalized to `[0, 1]`. The backend service `services/modelService.js` handles resizing and normalization (dividing by 255.0). If your model requires different preprocessing, update `backend/services/modelService.js`.

## Troubleshooting

*   **Version Mismatch:** If you encounter errors loading the model, ensure the version of TensorFlow used to train the model is compatible with the `tfjs-node` version used in the backend.
*   **Layer Support:** Some custom Keras layers might not be supported by TensorFlow.js. If conversion fails, check the [TensorFlow.js compatibility guide](https://js.tensorflow.org/api/latest/).
