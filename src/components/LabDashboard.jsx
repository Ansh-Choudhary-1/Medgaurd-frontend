import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload } from 'lucide-react';

function LabDashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { patientId } = useParams();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Please select a PNG image file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('xray', selectedFile);

    try {
      const response = await fetch(`http://localhost:3000/api/patients/${patientId}/xray`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload X-ray');
      }

      setSuccess('X-ray uploaded successfully');
      setSelectedFile(null);
    } catch (error) {
      setError('Error uploading X-ray. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#002E5D] mb-6">Lab Dashboard - X-ray Upload</h2>
      
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
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload X-ray Image (PNG only)</label>
          <input
            type="file"
            accept=".png"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
          />
        </div>
        
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`flex items-center justify-center space-x-2 w-full p-2 rounded-lg ${
            selectedFile
              ? 'bg-[#00A8A8] text-white hover:bg-[#008f8f]'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          <Upload className="h-5 w-5" />
          <span>Upload X-ray</span>
        </button>
      </div>
    </div>
  );
}

export default LabDashboard;