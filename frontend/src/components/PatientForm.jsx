import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function PatientForm({ onClose, onSuccess, editData }) {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: 'Male',
        phoneNumber: '',
        email: '',
        address: '',
        bloodGroup: '',
        medicalConditions: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                fullName: editData.fullName || '',
                age: editData.age || '',
                gender: editData.gender || 'Male',
                phoneNumber: editData.phoneNumber || '',
                email: editData.email || '',
                address: editData.address || '',
                bloodGroup: editData.bloodGroup || '',
                medicalConditions: editData.medicalConditions || '',
                emergencyContactName: editData.emergencyContactName || '',
                emergencyContactPhone: editData.emergencyContactPhone || ''
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editData) {
                await api.put(`/patients/${editData._id}`, formData);
                toast.success('Patient updated successfully');
            } else {
                await api.post('/patients', formData);
                toast.success('Patient registered successfully');
            }
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col">
                <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">{editData ? 'Update Record' : 'New Registration'}</h2>
                        <p className="text-sm text-gray-500">{editData ? 'Modifying existing patient documentation' : 'Creating a new professional medical file'}</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-200 rounded-full transition-colors bg-white shadow-sm border border-gray-100">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Info */}
                        <div className="col-span-2 flex items-center gap-4">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">01</span>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Personal Identification</h3>
                            <div className="h-[1px] bg-gray-100 flex-1"></div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Patient Full Name</label>
                            <input type="text" name="fullName" required className="input-field bg-gray-50/50" placeholder="e.g. John Doe" value={formData.fullName} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Age</label>
                            <input type="number" name="age" required min="1" max="150" className="input-field bg-gray-50/50" value={formData.age} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Gender Identification</label>
                            <select name="gender" className="input-field bg-gray-50/50" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Contact */}
                        <div className="col-span-2 flex items-center gap-4 mt-4">
                            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">02</span>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Contact Information</h3>
                            <div className="h-[1px] bg-gray-100 flex-1"></div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Primary Phone Number</label>
                            <input type="tel" name="phoneNumber" required className="input-field bg-gray-50/50" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Electronic Mail (Optional)</label>
                            <input type="email" name="email" className="input-field bg-gray-50/50" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="col-span-2 flex items-center gap-4 mt-4">
                            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">03</span>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Medical Background</h3>
                            <div className="h-[1px] bg-gray-100 flex-1"></div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Blood Group</label>
                            <select name="bloodGroup" className="input-field bg-gray-50/50 font-bold" value={formData.bloodGroup} onChange={handleChange}>
                                <option value="">N/A</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Existing Conditions / Alerts</label>
                            <textarea name="medicalConditions" rows="3" className="input-field bg-gray-50/50 resize-none" placeholder="Allergies, chronic diseases, current medication..." value={formData.medicalConditions} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 flex justify-end gap-4 items-center mb-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors uppercase text-xs tracking-widest">
                            Dismiss
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary min-w-[200px] py-4 text-sm shadow-xl shadow-primary/20">
                            {loading ? 'Processing...' : (editData ? 'Update Records' : 'Confirm Registration')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
