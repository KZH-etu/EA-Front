import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search, Settings } from 'lucide-react';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const mockUser = {
    name: 'Admin',
    email: 'admin@example.com'
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu toggle and breadcrumbs */}
        <div className="flex items-center">
          <button
            className="lg:hidden text-neutral-500 hover:text-neutral-700 p-2 rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <span className="text-neutral-500">Admin /</span>
            <span className="text-primary-700 font-medium ml-1">Tableau de bord</span>
          </div>
        </div>
        
        {/* Right side - Search, notifications, user menu */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-64 pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100">
            <Bell size={20} />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-neutral-100"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                {mockUser.name.charAt(0)}
              </div>
              <span className="hidden md:block font-medium text-neutral-700">
                {mockUser.name}
              </span>
            </button>
            
            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    to="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} className="mr-2" />
                    <span>Profil</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    <span>Paramètres</span>
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <span>Voir le site</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-error hover:bg-neutral-100"
                  >
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;