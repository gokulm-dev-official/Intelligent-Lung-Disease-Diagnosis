import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation, useNavigate } from 'react-router-dom';
import { DocumentArrowDownIcon, PrinterIcon, ShieldCheckIcon, EyeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import api from '../services/api';
import { format } from 'date-fns';

const HospitalHeader = () => (
    <div className="border-b-4 border-primary pb-6 mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">METRO PULMONOLOGY CENTER</h1>
            <p className="text-sm font-bold text-primary">Advanced AI Lung Disease Analysis & Research Facility</p>
            <p className="text-xs text-gray-500 mt-1 uppercase">Reg No: TN/CH/MDS-100249 | ISO 9001:2015 Certified</p>
        </div>
        <div className="text-right">
            <p className="text-xs font-bold text-gray-800">12/4, Medical Circle, Anna Salai</p>
            <p className="text-xs font-bold text-gray-800">Chennai, Tamil Nadu - 600002</p>
            <p className="text-xs font-bold text-gray-800">Contact: +91 44-2458-9000</p>
        </div>
    </div>
);

export default function Reports() {
    const location = useLocation();
    const navigate = useNavigate();
    const reportRef = useRef();
    const [generating, setGenerating] = useState(false);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(location.state?.reportData || null);

    useEffect(() => {
        if (!selectedReport) {
            fetchReports();
        }
    }, [selectedReport]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/analysis');
            setReports(data.data);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async (data) => {
        setGenerating(true);
        const element = reportRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Medical_Report_${data.patientId?.patientId || 'Report'}.pdf`);
        setGenerating(false);
    };

    if (!selectedReport) {
        return (
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Medical Reports Archive</h1>
                    <p className="text-gray-500">History of all AI lung analysis reports</p>
                </div>

                <div className="card p-0 overflow-hidden shadow-xl border-none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Patient Name</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Diagnosis</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Confidence</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {loading ? (
                                    <tr><td colSpan="5" className="p-12 text-center text-gray-400 italic">Loading archive...</td></tr>
                                ) : reports.length === 0 ? (
                                    <tr><td colSpan="5" className="p-12 text-center text-gray-400">No reports found in history.</td></tr>
                                ) : (
                                    reports.map((report) => (
                                        <tr key={report._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{report.patientId?.fullName || "Anonymized Patient"}</div>
                                                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{report.patientId?.patientId || report.analysisId}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${report.diagnosis === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {report.diagnosis}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {(report.primaryConfidence * 100).toFixed(1)}%
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {format(new Date(report.createdAt), 'dd MMM yyyy, HH:mm')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedReport({
                                                        patient: {
                                                            name: report.patientId?.fullName || "Anonymized",
                                                            id: report.patientId?.patientId || report.analysisId,
                                                            age: report.patientId?.age || "N/A",
                                                            gender: report.patientId?.gender || "N/A",
                                                            phone: report.patientId?.phoneNumber || "N/A"
                                                        },
                                                        analysis: {
                                                            date: format(new Date(report.createdAt), 'dd MMM yyyy, HH:mm'),
                                                            diagnosis: report.diagnosis,
                                                            confidence: report.primaryConfidence,
                                                            image: report.imageUrl.startsWith('http') ? report.imageUrl : `http://localhost:5002${report.imageUrl}`,
                                                            confidenceScores: report.confidenceScores
                                                        }
                                                    })}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                    title="View Full Report"
                                                >
                                                    <EyeIcon className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Detailed Report View
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setSelectedReport(null)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Back to List
                </button>
                <div className="flex gap-3">
                    <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <PrinterIcon className="w-5 h-5" /> Print
                    </button>
                    <button
                        onClick={() => downloadPDF(selectedReport)}
                        disabled={generating}
                        className="btn-primary"
                    >
                        {generating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <DocumentArrowDownIcon className="w-5 h-5" />}
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="card p-0 overflow-hidden shadow-2xl bg-gray-50 border-gray-200">
                <div ref={reportRef} className="bg-white p-12 mx-auto shadow-inner" style={{ width: '210mm', minHeight: '297mm' }}>
                    <HospitalHeader />

                    <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Patient Details</h3>
                            <div className="space-y-1">
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Name:</span> {selectedReport.patient.name}</p>
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Patient ID:</span> {selectedReport.patient.id}</p>
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Age/Gender:</span> {selectedReport.patient.age}Y / {selectedReport.patient.gender}</p>
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Contact:</span> {selectedReport.patient.phone}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Analysis Summary</h3>
                            <div className="space-y-1">
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Date:</span> {selectedReport.analysis.date}</p>
                                <p className="text-sm font-bold"><span className="text-gray-500 font-normal">Referrer:</span> Self-requested AI Screening</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-12 mb-10">
                        <div className="col-span-2">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Imaging Study</h3>
                            <img
                                src={selectedReport.analysis.image}
                                alt="Chest X-Ray"
                                crossOrigin="anonymous"
                                className="w-full aspect-square object-cover rounded-lg border-2 border-gray-100 shadow-sm grayscale"
                            />
                            <p className="text-[10px] text-center text-gray-400 mt-2 font-mono">FIG 1.0: ANTEROPOSTERIOR (AP) CHEST PROJECTION</p>
                        </div>
                        <div className="col-span-3 space-y-6">
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">AI Diagnostic Findings</h3>
                                <div className={`p-6 rounded-2xl border-2 ${selectedReport.analysis.diagnosis === 'Normal' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${selectedReport.analysis.diagnosis === 'Normal' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                                            <ShieldCheckIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Primary Classification</p>
                                            <h2 className={`text-3xl font-black ${selectedReport.analysis.diagnosis === 'Normal' ? 'text-green-700' : 'text-red-700'}`}>
                                                {selectedReport.analysis.diagnosis}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/40 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-600">Confidence Score:</span>
                                        <span className="text-lg font-black text-gray-900">{(selectedReport.analysis.confidence * 100).toFixed(2)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Observations</h3>
                                <p className="text-sm text-gray-700 leading-relaxed italic">
                                    "Neural Network analysis of the submitted radiograph shows {selectedReport.analysis.diagnosis === 'Normal' ? 'no significant pathological opacities in the lung fields. Diaphragmatic contours appear crisp. Mediastinal shadow within normal limits.' : `findings highly suggestive of ${selectedReport.analysis.diagnosis} patterns.`} Correlation with clinical symptoms and further laboratory tests (e.g., CT scan, PCR) is advised for definitive diagnosis."
                                </p>
                            </div>

                            {/* Confidence Scores */}
                            {selectedReport.analysis.confidenceScores && (
                                <div className="space-y-3 mt-6">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">AI Confidence Breakdown</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(selectedReport.analysis.confidenceScores).map(([disease, score]) => (
                                            <div key={disease} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="text-xs text-gray-500 capitalize mb-1">{disease}</div>
                                                <div className="text-lg font-bold text-gray-900">{(score * 100).toFixed(1)}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-20 flex justify-between items-center text-gray-400 pt-10 border-t border-gray-100">
                        <div className="text-center">
                            <div className="h-12 w-32 border-b border-gray-400 mx-auto mb-2 font-handwriting italic text-gray-900 text-lg">Dr. AI Scan</div>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Medical Officer Signature</p>
                        </div>
                        <div className="max-w-[300px] text-right">
                            <p className="text-[9px] leading-tight">Disclaimer: This is an AI-generated screening report. It should not be used as the sole basis for surgical or medical decisions. Always consult with a certified Pulmonary Specialist.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

