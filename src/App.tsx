import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Navbar } from './components/layout/Navbar';
import { auth, logout } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setCurrentPage('dashboard');
      } else {
        // Only redirect to landing if we are on dashboard
        if (currentPage === 'dashboard') {
          setCurrentPage('landing');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentPage]);

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'landing' && (
        <>
          <Navbar onLoginClick={handleLoginClick} userRole={user ? 'ADMIN' : null} />
          <Landing onLogin={handleLoginClick} />
        </>
      )}
      
      {currentPage === 'login' && (
        <Login onBack={handleBackToLanding} />
      )}
      
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
