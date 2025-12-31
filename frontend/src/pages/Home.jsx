import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

export default function Home() {
    const [stats, setStats] = useState({
        totalPatients: '...',
        accuracyRate: '98.5%',
        totalScans: '...'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard/stats');
                if (data.success) {
                    setStats(prev => ({
                        ...prev,
                        totalPatients: data.data.totalPatients.toLocaleString(),
                        totalScans: data.data.totalScans > 1000 ? (data.data.totalScans / 1000).toFixed(1) + 'k' : data.data.totalScans.toLocaleString()
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch home stats", error);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Patients Registered', value: stats.totalPatients, icon: UserGroupIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'AI Diagnostic Accuracy', value: stats.accuracyRate, icon: ShieldCheckIcon, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Scans Completed to Date', value: stats.totalScans, icon: BoltIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        AI-Powered Diagnostics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Advanced Lung Disease <br />
                        <span className="text-primary">Detection System</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Leveraging deep learning to analyze chest X-rays with high precision.
                        Detect COVID-19, Pneumonia, and Tuberculosis in seconds.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/analysis" className="btn-primary px-8 py-3 text-lg shadow-lg shadow-primary/30">
                            Start Analysis <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                        <Link to="/dashboard" className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            View Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Patient Management</h3>
                    <p className="text-blue-100 mb-6">Complete record keeping with history tracking, appointments, and report generation.</p>
                    <Link to="/patients" className="text-white font-semibold underline decoration-white/30 hover:decoration-white transition-all">
                        Manage Patients &rarr;
                    </Link>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Medical Analytics</h3>
                    <p className="text-gray-600 mb-6">Visual insights into disease distribution and clinic performance metrics.</p>
                    <Link to="/reports" className="text-primary font-semibold underline decoration-primary/30 hover:decoration-primary transition-all">
                        View Analytics &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
