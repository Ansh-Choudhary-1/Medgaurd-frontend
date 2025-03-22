import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#002E5D] text-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Layout className="h-6 w-6" />
          <span className="text-xl font-semibold">Healthcare Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-6">
          {!user ? (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login', { state: { role: 'lab' } })}
                className="hover:bg-[#003a77] px-4 py-2 rounded-lg transition-colors"
              >
                Lab Dashboard
              </button>
              <button
                onClick={() => navigate('/login', { state: { role: 'icu' } })}
                className="hover:bg-[#003a77] px-4 py-2 rounded-lg transition-colors"
              >
                ICU Dashboard
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.role === 'lab' ? 'Lab Assistant' : 'ICU Assistant'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:bg-[#003a77] px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;