import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultDisplay from '../components/ResultDisplay';
import { uploadImage } from '../services/api';
import { toast } from 'react-toastify';

export default function Analysis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        setResult(null);
        setError(null);
        handleAnalysis(file);
    };

    const handleClear = () => {
        setSelectedImage(null);
        setResult(null);
        setError(null);
    };

    const handleAnalysis = async (file) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await uploadImage(formData);
            if (response.data.success) {
                setResult(response.data.data);
                toast.success('Analysis completed successfully');
            }
        } catch (err) {
            console.error(err);
            const errorData = err.response?.data || { message: err.message };
            setError(errorData);
            toast.error('Failed to analyze image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">X-Ray Analysis</h1>
                <p className="text-gray-500 mt-2">Upload a chest X-ray image for AI-based diagnosis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <div className="order-2 lg:order-1">
                    <ResultDisplay result={result} loading={loading} error={error} />
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                    <div className="card">
                        <ImageUpload
                            onImageSelect={handleImageSelect}
                            selectedImage={selectedImage}
                            onClear={handleClear}
                        />
                    </div>
                    {/* Instructions */}
                    <div className="card bg-blue-50 border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2">Instructions</h4>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li>Supported formats: JPG, PNG, JPEG</li>
                            <li>Maximum file size: 10MB</li>
                            <li>Ensure the X-ray is clear and properly oriented</li>
                            <li>Patient data is anonymized during processing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
