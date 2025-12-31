import { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../services/api';
import PatientForm from '../components/PatientForm';
import { format } from 'date-fns';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'react-toastify';

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPatient, setEditingPatient] = useState(null);
    const { isAdmin } = useAdmin();

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/patients?search=${searchTerm}`);
            setPatients(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchPatients();
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (!isAdmin) {
            toast.error("Admin permission required to delete");
            return;
        }
        if (!confirm("Are you sure you want to delete this patient? All records will be lost.")) return;

        try {
            await api.delete(`/patients/${id}`);
            toast.success("Patient deleted");
            fetchPatients();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const handleEdit = (patient) => {
        if (!isAdmin) {
            toast.error("Admin permission required to update");
            return;
        }
        setEditingPatient(patient);
        setShowForm(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patient Directory</h1>
                    <p className="text-gray-500">Comprehensive management of medical records</p>
                </div>
                {isAdmin && (
                    <button onClick={() => { setEditingPatient(null); setShowForm(true); }} className="btn-primary shadow-lg shadow-primary/30">
                        <PlusIcon className="w-5 h-5" /> Add New Patient
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="card p-4 flex gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or phone number..."
                        className="input-field pl-10 h-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="card overflow-hidden p-0 border-none shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Patient Details</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Vitals & Info</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Last Checkup</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {loading ? (
                                <tr><td colSpan="4" className="p-12 text-center text-gray-400 italic">Retrieving secure data...</td></tr>
                            ) : patients.length === 0 ? (
                                <tr><td colSpan="4" className="p-12 text-center text-gray-400">No records found.</td></tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {patient.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{patient.fullName}</div>
                                                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{patient.patientId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-700">{patient.age}Y • {patient.gender}</div>
                                            <div className="text-xs text-gray-500">{patient.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-800">
                                                {patient.lastVisitDate ? format(new Date(patient.lastVisitDate), 'dd MMM yyyy') : 'No history'}
                                            </div>
                                            <div className="text-[10px] text-primary uppercase font-bold">{patient.totalScans} total scans</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {isAdmin && (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(patient)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                                                            title="Edit Patient"
                                                        >
                                                            <PencilIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(patient._id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                                                            title="Delete Patient"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                                {!isAdmin && <span className="text-[10px] text-gray-300 italic">View Only</span>}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <PatientForm
                    onClose={() => { setShowForm(false); setEditingPatient(null); }}
                    onSuccess={fetchPatients}
                    editData={editingPatient}
                />
            )}
        </div>
    );
}
