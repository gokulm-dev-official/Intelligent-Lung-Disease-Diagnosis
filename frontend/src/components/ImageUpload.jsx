import { useCallback, useState } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function ImageUpload({ onImageSelect, selectedImage, onClear }) {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Validate type
        if (!file.type.match('image.*')) {
            alert("Please upload an image file");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("File size should be less than 10MB");
            return;
        }

        onImageSelect(file);
    };

    if (selectedImage) {
        return (
            <div className="relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center group">
                <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4">
                    <button
                        onClick={onClear}
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                relative w-full h-96 rounded-2xl border-3 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer
                ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('input-file-upload').click()}
        >
            <input
                type="file"
                id="input-file-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChange}
            />

            <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CloudArrowUpIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Upload Chest X-Ray
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Drag and drop your image here, or click to browse.
                    Supports JPG, PNG, JPEG (Max 10MB).
                </p>
                <div className="btn-primary w-fit mx-auto">
                    Browse Files
                </div>
            </div>
        </div>
    );
}
