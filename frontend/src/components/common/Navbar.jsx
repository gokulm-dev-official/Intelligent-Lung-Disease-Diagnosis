import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center justify-between px-6">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md hidden sm:block">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search patients, reports..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-800">Administrator</p>
                        <p className="text-xs text-secondary font-medium">System Operator</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-white shadow-sm">
                        AD
                    </div>
                </div>
            </div>
        </header>
    );
}
