import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

function CreatePatient() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/patient/create-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create patient');
      }

      navigate('/patients');
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#002E5D] mb-6">Create New Patient</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Full Name is required' })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            type="number"
            {...register('age', { required: 'Age is required', min: { value: 0, message: 'Age must be a positive number' } })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#00A8A8] text-white px-6 py-2 rounded-lg hover:bg-[#008f8f] transition-colors"
          >
            Create Patient
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePatient;
