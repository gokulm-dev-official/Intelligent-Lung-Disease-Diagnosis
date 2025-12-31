import { useState, useMemo } from 'react';
import { TN_HOSPITALS, DISTRICTS } from '../utils/hospitalData';
import { MapPinIcon, PhoneIcon, BuildingOfficeIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Appointments() {
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [selectedType, setSelectedType] = useState('All');

    const filteredHospitals = useMemo(() => {
        return TN_HOSPITALS.filter(hospital => {
            const districtMatch = selectedDistrict === 'All' || hospital.district === selectedDistrict;
            const typeMatch = selectedType === 'All' || hospital.type === selectedType;
            return districtMatch && typeMatch;
        });
    }, [selectedDistrict, selectedType]);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Hospital Directory</h1>
                <p className="text-gray-500 mt-2">Tamil Nadu District-wise Government & Private Hospitals</p>
            </div>

            {/* Filters */}
            <div className="card p-6 flex flex-wrap gap-6 items-end sticky top-16 z-20">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-primary" /> Select District
                    </label>
                    <select
                        className="input-field min-w-[200px]"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                        <option value="All">All Districts</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <BuildingOfficeIcon className="w-4 h-4 text-primary" /> Hospital Type
                    </label>
                    <select
                        className="input-field min-w-[200px]"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Government">Government</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <div className="flex-1 text-right text-sm font-medium text-gray-500">
                    Showing {filteredHospitals.length} hospitals
                </div>
            </div>

            {/* Hospital Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHospitals.map((hospital) => (
                    <div key={hospital.id} className="card hover:shadow-lg transition-all border-l-4 border-l-primary group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${hospital.type === 'Government' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>
                                {hospital.type}
                            </span>
                            <span className="text-xs font-medium text-gray-400">{hospital.district}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight min-h-[50px]">
                            {hospital.name}
                        </h3>

                        <div className="space-y-3 mt-4">
                            <p className="text-sm text-gray-600 flex items-start gap-2">
                                <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                {hospital.address}
                            </p>
                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-primary" />
                                {hospital.phone}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <a
                                href={hospital.map}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-sm font-bold py-2"
                            >
                                <MapPinIcon className="w-4 h-4" /> View Location Map
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredHospitals.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">No hospitals found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
