import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <Logo className="h-12 w-auto" />
            </div>
            <p className="text-neutral-300 mb-4">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-primary-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-primary-400 transition-colors duration-200">
                <Youtube size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-primary-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/sermons/audio" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.audioSermons')}
                </Link>
              </li>
              <li>
                <Link to="/sermons/video" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.videoSermons')}
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.books')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors duration-200">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-neutral-300">123 Rue Principale, Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary-400 flex-shrink-0" />
                <span className="text-neutral-300">+225 01 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary-400 flex-shrink-0" />
                <span className="text-neutral-300">contact@assemblee-abidjan.org</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('footer.newsletter')}</h3>
            <p className="text-neutral-300 mb-4">
              {t('footer.subscribeNewsletter')}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
              />
              <button type="submit" className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors duration-200">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>
            &copy; {currentYear} Assemblée d'Abidjan. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;