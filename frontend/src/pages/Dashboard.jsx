import { useEffect, useState } from 'react';
import { DiseaseDistributionChart, ScansHistoryChart } from '../components/ChartComponents';
import { UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'; // Note: HeroIcons v2
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, chartsRes] = await Promise.all([
                    api.get('/dashboard/stats'),
                    api.get('/dashboard/charts')
                ]);
                setStats(statsRes.data.data);

                // Process chart data
                const breakdown = statsRes.data.data.breakdown;
                const pieData = [
                    { name: 'Normal', value: breakdown.normal },
                    { name: 'COVID-19', value: breakdown.covid },
                    { name: 'Pneumonia', value: breakdown.pneumonia },
                    { name: 'TB', value: breakdown.tuberculosis },
                ];

                // Mocking month names logic for simplicity if not returned perfectly
                const barData = chartsRes.data.data.scansByMonth.map(item => ({
                    name: `Month ${item._id}`, // Ideally convert to Jan, Feb etc
                    count: item.count
                }));

                setChartData({ pieData, barData });
            } catch (error) {
                console.error("Dashboard error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center animate-pulse">Retrieving secure biometric stats...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Health Overview</h1>
                    <p className="text-gray-500">System active, hello GOKUL M</p>
                </div>
                <button onClick={() => navigate('/reports')} className="btn-primary shadow-lg shadow-primary/20">
                    Access Reports Registry
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <UserGroupIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Patients</p>
                        <p className="text-2xl font-bold">{stats?.totalPatients}</p>
                    </div>
                </div>
                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <BoltIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Scans</p>
                        <p className="text-2xl font-bold">{stats?.totalScans}</p>
                    </div>
                </div>
                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <BoltIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Positive Cases</p>
                        <p className="text-2xl font-bold">{stats?.positiveCases}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="font-bold text-gray-900 mb-6">Disease Distribution</h3>
                    <DiseaseDistributionChart data={chartData?.pieData || []} />
                </div>
                <div className="card">
                    <h3 className="font-bold text-gray-900 mb-6">Scans Overview</h3>
                    <ScansHistoryChart data={chartData?.barData || []} />
                </div>
            </div>
        </div>
    );
}
