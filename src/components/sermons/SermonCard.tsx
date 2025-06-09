import { Play, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

interface SermonProps {
  id: string;
  title: string;
  preacher: string;
  date: string;
  type: string; // 'audio' or 'video'
  mediaUrl?: string;
}

const locales = [
  {
    locale : 'fr-FR',
    lang: 'fr'
  },
  {
    locale : 'en-US',
    lang: 'en'
  },
  {
    locale : 'es-ES',
    lang: 'es'
  }
]

interface SermonCardProps {
  sermon: SermonProps;
}

const SermonCard = ({ sermon }: SermonCardProps, currentLanguage?: String) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { t } = useTranslation();

  const chooseLocale = () => {
    const currentLocale = locales.find(locale => locale.lang === currentLanguage);
    return currentLocale ? currentLocale.locale : 'fr-FR';
  }

  const formattedDate = new Date(sermon.date).toLocaleDateString(chooseLocale(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/sermons/${sermon.id}`);
  };

  const handleCardClick = () => {
    navigate(`/sermons/${sermon.id}`);
  };

  return (
    <motion.div 
      className="card group h-full flex flex-col cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <div className="relative">
        {sermon.type === 'video' ? (
          // Video thumbnail
          <div className="aspect-video bg-neutral-900 flex items-center justify-center">
            {sermon.mediaUrl ? (
              <img 
                src={`https://img.youtube.com/vi/${sermon.mediaUrl.split('v=')[1]}/maxresdefault.jpg`}
                alt={sermon.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <span className="text-neutral-500">Vidéo non disponible</span>
              </div>
            )}
          </div>
        ) : (
          // Audio visualization
          <div className="h-48 bg-neutral-900 flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg"
              alt="Audio waveform"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="rounded-full bg-secondary-500 p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <Play size={24} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {sermon.title}
        </h3>
        
        <p className="text-neutral-600 mb-4">
          {sermon.preacher}
        </p>
        
        <div className="mt-auto flex items-center text-sm text-neutral-500 space-x-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SermonCard;