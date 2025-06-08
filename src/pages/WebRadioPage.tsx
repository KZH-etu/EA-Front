import { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import ReactPlayer from 'react-player';
import { useLanguageStore } from '../stores/useFrontEndLanguageStore';
import { useTranslation } from '../hooks/useTranslation';

const WebRadioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div>
      <PageHeader 
        title={t('nav.webradio')}
        subtitle={t('webradio.subtitle')}
        backgroundImage="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <div className="bg-primary-900 rounded-lg shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('webradio.titleCard')}
              </motion.h2>
              <p className="text-primary-100">
                {t('webradio.descriptionCard')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={handlePlayPause}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-full p-4 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4 w-full max-w-xs">
                <Volume2 size={20} className="text-primary-100" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Hidden Audio Player */}
              <div className="hidden">
                <ReactPlayer
                  url="https://example.com/stream"
                  playing={isPlaying}
                  volume={volume}
                  width="0"
                  height="0"
                />
              </div>
            </div>
          </div>

          {/* Program Schedule */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">{t('webradio.schedule.title')}</h3>
            <div className="grid gap-4">
              {[
                { day: 'Lundi', content: 'Messages d\'enseignement (10h-12h) • Musique d\'adoration (14h-16h)' },
                { day: 'Mardi', content: 'Étude biblique en direct (19h-21h) • Rediffusion des sermons (14h-16h)' },
                { day: 'Mercredi', content: 'Prière et intercession (18h-20h) • Messages choisis (14h-16h)' },
                { day: 'Jeudi', content: 'Témoignages et partages (15h-17h) • Musique d\'adoration (19h-21h)' },
                { day: 'Vendredi', content: 'Messages prophétiques (10h-12h) • Étude biblique (19h-21h)' },
                { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Messages d\'édification (18h-20h)' },
                { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
              ].map((schedule, index) => (
                <div 
                  key={schedule.day}
                  className="bg-neutral-50 p-4 rounded-lg border border-neutral-200"
                >
                  <h4 className="font-bold text-primary-600 mb-2">{schedule.day}</h4>
                  <p className="text-neutral-600">{schedule.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebRadioPage;