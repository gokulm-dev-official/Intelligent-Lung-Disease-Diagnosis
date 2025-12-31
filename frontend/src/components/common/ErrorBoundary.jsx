import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-100">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 mb-2">Application Crash</h1>
                        <p className="text-gray-500 mb-6 text-sm">A critical interface error occurred. Our engineers have been notified.</p>

                        <div className="bg-red-50 rounded-xl p-4 mb-6 text-left overflow-auto max-h-40">
                            <p className="text-[10px] font-mono text-red-600 break-all whitespace-pre-wrap">
                                {this.state.error && this.state.error.toString()}
                            </p>
                        </div>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
