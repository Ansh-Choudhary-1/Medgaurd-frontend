import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save } from 'lucide-react';

function ICUDashboard() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { patientId } = useParams();

  const handlePSVUpload = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/patients/${patientId}/psv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store PSV data');
      }

      setSuccess('PSV data stored successfully');
    } catch (error) {
      setError('Error storing PSV data. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#002E5D] mb-6">ICU Dashboard - PSV Data</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-6">
          Click the button below to store PSV data for the current patient.
        </p>
        
        <button
          onClick={handlePSVUpload}
          className="flex items-center justify-center space-x-2 w-full bg-[#00A8A8] text-white p-2 rounded-lg hover:bg-[#008f8f] transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>Store PSV Data</span>
        </button>
      </div>
    </div>
  );
}

export default ICUDashboard;