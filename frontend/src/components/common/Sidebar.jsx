import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import {
    HomeIcon,
    ChartBarIcon,
    UserGroupIcon,
    DocumentChartBarIcon,
    CalendarIcon,
    Cog6ToothIcon,
    BeakerIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Analysis', href: '/analysis', icon: BeakerIcon },
    { name: 'Patients', href: '/patients', icon: UserGroupIcon },
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
    { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const location = useLocation();
    const { isAdmin, logout } = useAdmin();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.info("Admin mode deactivated");
        navigate('/');
    };

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-50 overflow-hidden">
            <div className="p-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <BeakerIcon className="w-7 h-7" />
                </div>
                <div>
                    <span className="text-2xl font-black text-gray-900 leading-none tracking-tighter">LUNG<span className="text-primary">AI</span></span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Medical Expert</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                {navigation.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.href)}
                            className={clsx(
                                'flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all duration-300 group relative',
                                isActive
                                    ? 'bg-gray-950 text-white shadow-2xl shadow-gray-900/40'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                            )}
                        >
                            <item.icon className={clsx("w-6 h-6 transition-transform duration-300 group-hover:scale-110", isActive ? "text-primary" : "text-gray-300 group-hover:text-primary")} />
                            <span className="font-bold text-sm">{item.name}</span>
                            {isActive && <div className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_10px_#1976D2]"></div>}
                        </button>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-gray-100">
                {isAdmin ? (
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 text-white shadow-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheckIcon className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Admin Access</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4 leading-tight">Master Control Protocol active. Full CRUD privileges granted.</p>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black tracking-widest uppercase transition-all"
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" /> Deactivate
                        </button>
                    </div>
                ) : (
                    <div className="bg-primary/5 rounded-3xl p-5 border border-primary/10">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 text-center">Standard Interface</p>
                        <button
                            onClick={() => navigate('/settings')}
                            className="w-full py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm hover:border-primary transition-all"
                        >
                            Unlock Privileges
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
