import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useAdminStore } from '../stores/useAdminStore';

const MainLayout = () => {
  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { entities, books, sermons, fetchData, hasFetched } = useAdminStore();
  
    useEffect(() => {
      if (!hasFetched) {
        console.log('Fetching initial data...');
        fetchData();
        console.log('Data fetched:', { books, sermons, entities });
      }
    }, [fetchData, hasFetched]);

  // Control scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main 
        className="flex-grow"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      {showScrollButton && <ScrollToTop />}
    </div>
  );
};

export default MainLayout;