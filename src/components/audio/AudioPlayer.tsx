import { useState, useEffect } from 'react';
import { Play, Pause, Download, X } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Sermon } from '../../stores/useSermonsStore';

interface AudioPlayerProps {
  sermon: Sermon | null;
  onClose: () => void;
  currentLanguage: string;
}

const AudioPlayer = ({ sermon, onClose, currentLanguage }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
  }, [sermon]);

  const handleProgress = ({ played }: { played: number }) => {
    setProgress(played);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!sermon) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center flex-shrink-0"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
          </button>

          {/* Sermon Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="truncate">
                <h4 className="font-medium text-neutral-900 truncate">{sermon.translations.find(value => value.lang === currentLanguage)?.title}</h4>
                <p className="text-sm text-neutral-500 truncate">{sermon.preacher}</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                {sermon.translations.find(val => val.lang === currentLanguage)?.audioUrl && (
                  <a
                    href={sermon.translations.find(val => val.lang === currentLanguage)?.audioUrl}
                    download
                    className="text-neutral-500 hover:text-primary-600 transition-colors"
                  >
                    <Download size={20} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-primary-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-neutral-200 rounded-full">
              <div
                className="absolute h-full bg-primary-500 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>{formatTime(duration * progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Hidden Audio Player */}
        <div className="hidden">
          <ReactPlayer
            url={sermon.translations.find(val => val.lang === currentLanguage)?.audioUrl}
            playing={isPlaying}
            onProgress={handleProgress}
            onDuration={setDuration}
            width="0"
            height="0"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;