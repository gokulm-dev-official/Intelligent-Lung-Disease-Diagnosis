import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Cog6ToothIcon, ArrowPathIcon, ShieldCheckIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useAdmin } from '../context/AdminContext';

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const [trainPass, setTrainPass] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const { isAdmin, login, logout } = useAdmin();

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (login(loginPass)) {
            toast.success("Admin authorized successfully");
            setLoginPass('');
        } else {
            toast.error("Invalid credentials provided");
        }
    };

    const handleTrain = async () => {
        if (!isAdmin) {
            toast.error("Administrator access required for training protocols.");
            return;
        }

        if (!confirm("DANGEROUS OPERATION: This will overwrite the current active AI model. Continue?")) return;

        setLoading(true);
        try {
            const response = await api.post('/settings/train', { password: 'admin123' });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Model training aborted due to error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">System Configuration</h1>
                <p className="text-gray-500 mt-2">Manage AI infrastructure and security protocols</p>
            </div>

            {!isAdmin ? (
                <div className="card border-2 border-primary/20 bg-primary/5 p-12 text-center space-y-8">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto text-primary border border-primary/10">
                        <LockOpenIcon className="w-10 h-10" />
                    </div>
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Access Restricted</h2>
                        <p className="text-gray-500 leading-relaxed font-medium">Please authenticate using the master password to access system-level operations including patient deletion, records updating, and AI model retraining.</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="flex gap-4 max-w-sm mx-auto">
                        <input
                            type="password"
                            placeholder="Master Password"
                            className="input-field bg-white shadow-sm h-14"
                            value={loginPass}
                            onChange={(e) => setLoginPass(e.target.value)}
                        />
                        <button type="submit" className="btn-primary px-8 shadow-xl shadow-primary/20">
                            Authorize
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Default Credential: admin123</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="card p-10 border-2 border-teal-500/20 bg-teal-50/10">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-500/30">
                                    <ShieldCheckIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 leading-tight">Administrative Suite</h2>
                                    <p className="text-teal-600 font-bold text-xs uppercase tracking-widest">Master Credentials Authorized</p>
                                </div>
                            </div>
                            <button onClick={logout} className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                Flush Session
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-black text-gray-800 mb-2">Neural Network Retraining</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    Initiate deep learning optimization using the source dataset located in the <code>TrainingDataSet</code> localized cluster.
                                    This operation consumes significant CPU/GPU resources and cannot be paused.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-gray-100">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Active Model</span>
                                            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">v4.2.1-PRO</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500 w-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleTrain}
                                        disabled={loading}
                                        className="btn-primary min-w-[200px] py-4 bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-600/20"
                                    >
                                        {loading ? (
                                            <>
                                                <ArrowPathIcon className="w-5 h-5 animate-spin" /> RUNNING SYNC...
                                            </>
                                        ) : (
                                            "EXECUTE TRAINING"
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <h3 className="text-lg font-black text-gray-800 mb-2">System Analytics Toggle</h3>
                                <p className="text-gray-400 text-sm">Advanced telemetry and error logging (Planned in v2.0)</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
