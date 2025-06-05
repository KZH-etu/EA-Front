import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 z-40"
      aria-label="Retour en haut"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;