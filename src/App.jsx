import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PatientList from './components/PatientList';
import CreatePatient from './components/CreatePatient';
import LabDashboard from './components/LabDashboard';
import ICUDashboard from './components/ICUDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LabInput from './components/LabInput';
import ICUinput from './components/ICUinput';
import ResultLab from './components/ResultLab';
import ResultICU from './components/ResultICU';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/result-lab" element={<ResultLab />} />
              <Route path="/result-icu" element={<ResultICU />} />
              <Route path="/icu" element={<ICUinput />} />
              <Route path="/:id" element={<LabInput />} />
              <Route
                path="/patients"
                element={
                  <ProtectedRoute>
                    <PatientList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-patient"
                element={
                  <ProtectedRoute>
                    <CreatePatient />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lab-dashboard"
                element={
                  <ProtectedRoute roleRequired="lab">
                    <LabDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/icu-dashboard"
                element={
                  <ProtectedRoute roleRequired="icu">
                    <ICUDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;