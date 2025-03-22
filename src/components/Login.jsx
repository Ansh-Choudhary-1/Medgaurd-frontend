import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const role = location.state?.role || 'lab';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ ...credentials, role });
      navigate('/patients');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#002E5D] mb-6">
          {role === 'lab' ? 'Lab Assistant Login' : 'ICU Assistant Login'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#00A8A8] text-white py-2 px-4 rounded-lg hover:bg-[#008f8f] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;