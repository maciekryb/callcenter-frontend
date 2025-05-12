import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { Calendar, Users, ClipboardList, Home, Menu, X } from 'lucide-react';
import AddAgent from './pages/AddAgent';
import CreateSchedule from './pages/CreateSchedule';
import AgentsAvailabilitySchedule from './pages/AgentsAvailabilitySchedule';
import Dashboard from './pages/Dashboard';

const AppContent = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Strona główna', icon: <Home className="h-5 w-5 mr-2" /> },
    { path: '/add-agent', label: 'Dodaj Pracownika', icon: <Users className="h-5 w-5 mr-2" /> },
    { path: '/agents-availability-schedule', label: 'Grafik dostępności', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { path: '/create-schedule', label: 'Stwórz Grafik', icon: <ClipboardList className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="hidden md:inline">System Zarządzania Grafikiem</span>
            <span className="md:hidden">SZG</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                      location.pathname === item.path 
                        ? "text-blue-600" 
                        : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-white p-4 md:hidden border-t shadow-lg">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                  location.pathname === item.path 
                    ? "bg-gray-100 text-blue-600" 
                    : "text-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/agents-availability-schedule" element={<AgentsAvailabilitySchedule />} />
          <Route path="/create-schedule" element={<CreateSchedule />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} System Zarządzania Grafikiem
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <AppContent 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
    </Router>
  );
};

export default App;
