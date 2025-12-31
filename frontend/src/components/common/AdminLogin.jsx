import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const { login, isAdmin, logout } = useAdmin();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(password)) {
            toast.success("Admin access granted");
            setPassword('');
        } else {
            toast.error("Invalid password");
        }
    };

    if (isAdmin) {
        return (
            <div className="card bg-green-50 border-green-100 flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="text-sm font-bold text-green-800">Administrator Mode Active</p>
                        <p className="text-xs text-green-700">Full CRUD and training access enabled</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="text-xs font-bold text-red-600 hover:text-red-800 uppercase"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-4">
                <LockClosedIcon className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-gray-900">Admin Login</h3>
            </div>
            <form onSubmit={handleLogin} className="flex gap-2">
                <input
                    type="password"
                    placeholder="Enter Admin Password"
                    className="input-field text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn-primary py-2 px-4 whitespace-nowrap">
                    Login
                </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-2">Default: admin123</p>
        </div>
    );
}
