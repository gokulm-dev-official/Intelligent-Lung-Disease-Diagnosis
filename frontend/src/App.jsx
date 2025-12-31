import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import About from './pages/About';

import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AdminProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="analysis" element={<Analysis />} />
                                <Route path="patients" element={<Patients />} />
                                <Route path="appointments" element={<Appointments />} />
                                <Route path="reports" element={<Reports />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="about" element={<About />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Route>
                        </Routes>
                    </Router>
                    <ToastContainer
                        position="bottom-right"
                        theme="colored"
                        hideProgressBar={false}
                        closeOnClick
                        pauseOnHover
                        draggable
                    />
                </AdminProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
