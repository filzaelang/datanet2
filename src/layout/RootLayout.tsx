// src/layout/RootLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBox,
  FiList, 
  FiSettings, 
  FiBell, 
  FiUser, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    // Khusus untuk dashboard, aktif jika di '/' atau '/dashboard'
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    // Untuk path lainnya, gunakan startsWith agar lebih fleksibel
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation for Wide Screens - Hidden on small screens */}
      <header className="hidden md:flex bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">DataNet</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <FiBell className="h-6 w-6" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              <FiUser className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation for Small Screens - Hidden on wide screens */}
      <header className="md:hidden bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">DataNet</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu - Visible only on small screens */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
            
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <FiBell className="h-6 w-6" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              <FiUser className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - Visible only on small screens when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="bg-white border-t border-gray-200">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md font-medium ${isActive('/dashboard') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/data-packages" 
                className={`block px-3 py-2 rounded-md font-medium ${isActive('/data-packages') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Data Packages
              </Link>
              <Link 
                to="/transaction-history" 
                className={`block px-3 py-2 rounded-md font-medium ${isActive('/transaction-history') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Transaction History
              </Link>
              <Link 
                to="/settings" 
                className={`block px-3 py-2 rounded-md font-medium ${isActive('/settings') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on small screens, visible on wide screens */}
        <aside className="hidden md:flex md:w-64 bg-white shadow-md shrink-0">
          <div className="p-4 w-full">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center p-3 rounded-lg w-full ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <FiHome className="h-6 w-6 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/data-packages" 
                  className={`flex items-center p-3 rounded-lg w-full ${isActive('/data-packages') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <FiBox className="h-6 w-6 mr-3" />
                  Data Packages
                </Link>
              </li>
              <li>
                <Link 
                  to="/transaction-history" 
                  className={`flex items-center p-3 rounded-lg w-full ${isActive('/transaction-history') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <FiList className="h-6 w-6 mr-3" />
                  Transaction History
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className={`flex items-center p-3 rounded-lg w-full ${isActive('/settings') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <FiSettings className="h-6 w-6 mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;