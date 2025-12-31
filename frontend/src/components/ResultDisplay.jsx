import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ResultDisplay({ result, loading, error, imageUrl }) {
    const [patients, setPatients] = useState([]);
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [saving, setSaving] = useState(false);
    const [savedAnalysis, setSavedAnalysis] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (showPatientModal) {
            fetchPatients();
        }
    }, [showPatientModal]);

    const fetchPatients = async () => {
        try {
            const { data } = await api.get('/patients');
            setPatients(data.data);
        } catch (err) {
            console.error('Failed to fetch patients:', err);
            toast.error('Failed to load patients');
        }
    };

    const handleSaveResult = async () => {
        if (!selectedPatient) {
            toast.error('Please select a patient first');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                patientId: selectedPatient._id,
                imagePath: result.imagePath,
                imageUrl: result.imageUrl,
                diagnosis: result.diagnosis,
                confidenceScores: result.confidenceScores,
                primaryConfidence: result.primaryConfidence,
                doctorNotes: '',
                recommendations: getRecommendations(result.diagnosis)
            };

            const response = await api.post('/analysis/save', payload);

            if (response.data.success) {
                setSavedAnalysis(response.data.data);
                toast.success('Analysis saved successfully!');
                setShowPatientModal(false);
            }
        } catch (err) {
            console.error('Save error:', err);
            toast.error(err.response?.data?.message || 'Failed to save analysis');
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadReport = () => {
        if (!savedAnalysis) {
            toast.error('Please save the result first');
            return;
        }

        // Navigate to reports page with analysis data
        navigate('/reports', {
            state: {
                reportData: {
                    patient: {
                        name: selectedPatient.fullName,
                        id: selectedPatient.patientId,
                        age: selectedPatient.age,
                        gender: selectedPatient.gender,
                        phone: selectedPatient.phoneNumber
                    },
                    analysis: {
                        date: new Date().toLocaleString(),
                        diagnosis: result.diagnosis,
                        confidence: result.primaryConfidence,
                        image: result.imageUrl,
                        confidenceScores: result.confidenceScores
                    }
                }
            }
        });
    };

    const getRecommendations = (diagnosis) => {
        const recommendations = {
            'COVID': 'Immediate isolation recommended. RT-PCR test required for confirmation. Monitor oxygen saturation. Consult pulmonologist.',
            'COVID-19': 'Immediate isolation recommended. RT-PCR test required for confirmation. Monitor oxygen saturation. Consult pulmonologist.',
            'Pneumonia': 'Antibiotic therapy may be required. Follow-up chest X-ray in 2-3 weeks. Monitor for complications.',
            'Tuberculosis': 'Sputum test for AFB required. Start DOTS therapy if confirmed. Contact tracing recommended.',
            'Normal': 'No immediate intervention required. Maintain regular health checkups. Follow preventive care guidelines.'
        };
        return recommendations[diagnosis] || 'Consult with a healthcare professional for detailed evaluation.';
    };

    if (loading) {
        return (
            <div className="card h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary animate-pulse">AI</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analyzing Image...</h3>
                    <p className="text-gray-500 text-sm mt-1">Our neural network is processing the scan</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card h-full flex flex-col items-center justify-center p-12 text-center text-red-500">
                <ExclamationTriangleIcon className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-bold">Analysis Failed</h3>
                <p className="text-sm mt-2">{error.message || error}</p>
                {error.details && (
                    <div className="mt-4 p-2 bg-black/5 rounded text-[10px] font-mono whitespace-pre-wrap text-left w-full overflow-auto max-h-32">
                        {error.details}
                    </div>
                )}
            </div>
        );
    }

    if (!result) {
        return (
            <div className="card h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircleIcon className="w-8 h-8" />
                </div>
                <p>Upload an image to see analysis results</p>
            </div>
        );
    }

    const { diagnosis, confidenceScores, primaryConfidence } = result;

    // Determine color based on diagnosis
    let colorClass = 'text-gray-500';
    let bgClass = 'bg-gray-50';

    if (diagnosis === 'COVID-19' || diagnosis === 'Pneumonia' || diagnosis === 'Tuberculosis') {
        colorClass = 'text-red-600';
        bgClass = 'bg-red-50';
    } else if (diagnosis === 'Normal') {
        colorClass = 'text-green-600';
        bgClass = 'bg-green-50';
    }

    // Sort scores for list
    const sortedScores = Object.entries(confidenceScores).sort(([, a], [, b]) => b - a);

    return (
        <>
            <div className="card h-full space-y-8 animate-fade-in-up">
                <div className={`p-6 rounded-xl ${bgClass} text-center`}>
                    <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">Primary Diagnosis</p>
                    <h2 className={`text-4xl font-bold ${colorClass} mb-2`}>{diagnosis}</h2>
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${diagnosis === 'Normal' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="font-semibold text-sm">{(primaryConfidence * 100).toFixed(1)}% Confidence</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Detailed Probability</h4>
                    {sortedScores.map(([disease, score]) => {
                        const percentage = (score * 100).toFixed(1);
                        return (
                            <div key={disease} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize font-medium text-gray-700">{disease}</span>
                                    <span className="text-gray-500">{percentage}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={clsx(
                                            "h-full rounded-full transition-all duration-1000",
                                            disease === 'normal' ? 'bg-green-500' : 'bg-blue-600'
                                        )}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 className="font-bold text-blue-900 text-sm mb-2">Recommendations</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        {getRecommendations(diagnosis)}
                    </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-3">
                    <button
                        onClick={() => setShowPatientModal(true)}
                        className="flex-1 btn-primary"
                        disabled={savedAnalysis !== null}
                    >
                        {savedAnalysis ? '✓ Saved' : 'Save Result'}
                    </button>
                    <button
                        onClick={handleDownloadReport}
                        className="btn-secondary bg-gray-800 text-white hover:bg-gray-900"
                        disabled={!savedAnalysis}
                    >
                        Download Report
                    </button>
                </div>
            </div>

            {/* Patient Selection Modal */}
            {showPatientModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Select Patient</h3>
                            <button
                                onClick={() => setShowPatientModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-96">
                            {patients.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No patients found. Please register a patient first.</p>
                            ) : (
                                <div className="space-y-2">
                                    {patients.map((patient) => (
                                        <div
                                            key={patient._id}
                                            onClick={() => setSelectedPatient(patient)}
                                            className={clsx(
                                                "p-4 border-2 rounded-xl cursor-pointer transition-all",
                                                selectedPatient?._id === patient._id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-gray-200 hover:border-primary/50"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-bold text-gray-900">{patient.fullName}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {patient.patientId} • {patient.age}Y • {patient.gender}
                                                    </div>
                                                </div>
                                                {selectedPatient?._id === patient._id && (
                                                    <CheckCircleIcon className="w-6 h-6 text-primary" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setShowPatientModal(false)}
                                className="flex-1 btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveResult}
                                disabled={!selectedPatient || saving}
                                className="flex-1 btn-primary"
                            >
                                {saving ? 'Saving...' : 'Save Analysis'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

