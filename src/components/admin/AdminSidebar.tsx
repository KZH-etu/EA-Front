import { NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import { 
  Home, 
  Book, 
  FileText, 
  Calendar, 
  Radio, 
  MessageSquare, 
  LogOut, 
  Tag,
  Activity,
  Languages
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar = ({ isOpen, toggleSidebar }: AdminSidebarProps) => {
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div 
      className={`bg-primary-800 text-white fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '280px' }}
    >
      {/* Sidebar Header */}
      <div className="p-5 border-b border-primary-700">
        <div className="flex items-center justify-center">
          <Logo className="h-10" admin={true} />
        </div>
      </div>
      
      {/* Sidebar Content */}
      <div className="p-5">
        <div className="space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Home size={18} className="mr-3" />
            <span>Tableau de Bord</span>
          </NavLink>
          
          <NavLink
            to="/admin/entities"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Book size={18} className="mr-3" />
            <span>Entités</span>
          </NavLink>
          
          <NavLink
            to="/admin/mediaVersion"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <FileText size={18} className="mr-3" />
            <span>Version des média</span>
          </NavLink>

          <NavLink
            to="/admin/mediaSupport"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Activity size={18} className="mr-3" />
            <span>Nature des média</span>
          </NavLink>
          
          <NavLink
            to="/admin/tags"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Tag size={18} className="mr-3" />
            <span>Tags</span>
          </NavLink>
          
          <NavLink
            to="/admin/events"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Calendar size={18} className="mr-3" />
            <span>Événements</span>
          </NavLink>
          
          <NavLink
            to="/admin/streams"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive  
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Radio size={18} className="mr-3" />
            <span>Streaming</span>
          </NavLink>
          
          <NavLink
            to="/admin/newsletter"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <MessageSquare size={18} className="mr-3" />
            <span>Newsletter</span>
          </NavLink>

          <NavLink
            to="/admin/language"
            className={({ isActive }) => 
              `flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`
            }
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
          >
            <Languages size={18} className="mr-3" />
            <span> Langues </span>
          </NavLink>
        </div>
        
        <div className="pt-8 mt-8 border-t border-primary-700">
          <div className="space-y-1">
            <button
              className="flex items-center py-3 px-4 rounded-md transition-colors w-full text-left text-primary-100 hover:bg-primary-700 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;