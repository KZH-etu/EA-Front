import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Radio, Tv } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Logo from '../ui/Logo';
import LanguageToggle from '../ui/LanguageToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    {
      name: t('nav.sermons'),
      children: [
        { name: t('nav.audioSermons'), path: '/sermons/audio' },
        { name: t('nav.videoSermons'), path: '/sermons/video' }
      ]
    },
    { name: t('nav.books'), path: '/books' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.name} className="relative group">
                <button className="text-base font-medium text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                  {link.name}
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-lg shadow-lg py-2 min-w-[160px]">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) => 
                          `block px-4 py-2 text-base font-medium transition-colors duration-200 ${
                            isActive 
                              ? 'text-primary-600 bg-primary-50' 
                              : 'text-neutral-800 hover:text-primary-500 hover:bg-neutral-50'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary-600' 
                      : 'text-neutral-800 hover:text-primary-500'
                  }`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            )
          ))}

          {/* Media Links */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/webradio"
              className={({ isActive }) => 
                `flex items-center text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-neutral-800 hover:text-primary-500'
                }`
              }
            >
              <Radio size={18} className="mr-1" />
              <span>{t('nav.webradio')}</span>
            </NavLink>
            
            <NavLink
              to="/webtv"
              className={({ isActive }) => 
                `flex items-center text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-neutral-800 hover:text-primary-500'
                }`
              }
            >
              <Tv size={18} className="mr-1" />
              <span>{t('nav.webtv')}</span>
            </NavLink>
          </div>

          {/* Language Toggle */}
          <LanguageToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <LanguageToggle />
          <button
            className="text-neutral-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="container-custom py-4 space-y-4">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.name} className="space-y-2">
                <div className="text-base font-medium text-neutral-800 px-4">
                  {link.name}
                </div>
                <div className="pl-4 space-y-2">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) => 
                        `block py-2 text-base font-medium transition-colors duration-200 ${
                          isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block py-2 text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                  }`
                }
                onClick={() => setIsOpen(false)}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            )
          ))}

          {/* Mobile Media Links */}
          <div className="border-t border-neutral-200 pt-4 space-y-4">
            <NavLink
              to="/webradio"
              className={({ isActive }) => 
                `flex items-center py-2 text-base font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Radio size={18} className="mr-2" />
              <span>{t('nav.webradio')}</span>
            </NavLink>
            
            <NavLink
              to="/webtv"
              className={({ isActive }) => 
                `flex items-center py-2 text-base font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Tv size={18} className="mr-2" />
              <span>{t('nav.webtv')}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;