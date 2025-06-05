import { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import { YouTubeLivePlayer } from "../components/audio/YoutubeLivePlayer";
import useYouTubeLiveStatus from "../hooks/useYouTubeLiveStatus";


const WebTVPage = () => {
  const channelId = "UCsWwwtkGxIDsZZ5vWV5AFQg";
  const apiKey = import.meta.env.REACT_APP_YOUTUBE_API_KEY!;
  const isLive = useYouTubeLiveStatus(channelId, apiKey);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div>
      <PageHeader 
        title="WebTV" 
        subtitle="Regardez nos diffusions en direct et nos émissions"
        backgroundImage="https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                Diffusion en Direct
              </motion.h2>
              <p className="text-primary-100">
                Suivez nos cultes, enseignements et événements spéciaux en direct
              </p>
            </div>

            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
              {
                isLive == null ?
                  <p className="text-center mt-12">⏳ Vérification du live en cours...</p>
                  :
                isLive ?
                  <YouTubeLivePlayer
                    channelId={channelId}
                  /> :
                  <p className="text-center mt-12 text-red-600">🔴 Le live n'est pas encore commencé.</p>
              }
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
            </div>
          </div>

          {/* Program Schedule */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Programme des Diffusions</h3>
            <div className="grid gap-4">
              {[
                { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
                { day: 'Mercredi', content: 'Étude biblique (19h-21h) • Rediffusion (22h-00h)' },
                { day: 'Vendredi', content: 'Soirée de prière (18h-20h) • Messages choisis (21h-23h)' },
                { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Émissions spéciales (19h-21h)' },
              ].map((schedule) => (
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

          {/* Upcoming Broadcasts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Prochaines Émissions Spéciales</h3>
            <div className="grid gap-4">
              {[
                {
                  title: 'Convention Annuelle',
                  date: '15-17 Juin 2024',
                  description: 'Trois jours de messages puissants et d\'adoration'
                },
                {
                  title: 'Séminaire sur la Foi',
                  date: '25 Juin 2024',
                  description: 'Enseignement approfondi sur les fondements de la foi'
                },
              ].map((event, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-neutral-200"
                >
                  <h4 className="text-xl font-bold text-primary-600 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-secondary-500 font-medium mb-2">{event.date}</p>
                  <p className="text-neutral-600">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebTVPage;