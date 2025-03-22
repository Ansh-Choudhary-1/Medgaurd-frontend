import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/patient/fetch-patient');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#002E5D]">Patients List</h1>
        <button
          onClick={() => navigate('/create-patient')}
          className="bg-[#00A8A8] text-white px-4 py-2 rounded-lg hover:bg-[#008f8f] transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Patient</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search patients by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-[#002E5D] mb-2">{patient.name}</h3>
            <div className="text-gray-600 space-y-2">
              <p>ID: {patient._id}</p>
              <p>Age: {patient.age}</p>
              <p>Gender: {patient.gender}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  if(user.role=='lab')navigate(`/${patient._id}`)
                  else navigate(`/icu`)
                  }}
                className="text-[#00A8A8] hover:text-[#008f8f] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;