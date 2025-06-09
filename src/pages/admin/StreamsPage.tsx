import { useState } from 'react';
import { Radio, Tv, Play, Pause, Settings, RefreshCw } from 'lucide-react';

const StreamsPage = () => {
  const [webradioStatus, setWebradioStatus] = useState('online');
  const [webtvStatus, setWebtvStatus] = useState('offline');
  const [isLoading, setIsLoading] = useState(false);

  const toggleStream = (type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'radio') {
        setWebradioStatus(webradioStatus === 'online' ? 'offline' : 'online');
      } else {
        setWebtvStatus(webtvStatus === 'online' ? 'offline' : 'online');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-800">Gestion des Streams</h1>
        <button 
          className="btn-outline flex items-center"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
          }}
        >
          <RefreshCw size={18} className="mr-2" />
          Actualiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WebRadio Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Radio size={24} className="text-primary-600 mr-3" />
              <h2 className="text-xl font-bold">WebRadio</h2>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              webradioStatus === 'online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-neutral-100 text-neutral-800'
            }`}>
              {webradioStatus === 'online' ? 'En Ligne' : 'Hors Ligne'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium">État du Stream</p>
                <p className="text-sm text-neutral-600">Port: 8000 • Format: MP3</p>
              </div>
              <button
                className={`btn ${webradioStatus === 'online' ? 'btn-error' : 'btn-primary'}`}
                onClick={() => toggleStream('radio')}
                disabled={isLoading}
              >
                {webradioStatus === 'online' ? (
                  <Pause size={18} className="mr-2" />
                ) : (
                  <Play size={18} className="mr-2" />
                )}
                {webradioStatus === 'online' ? 'Arrêter' : 'Démarrer'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium">Configuration</p>
                <p className="text-sm text-neutral-600">Paramètres du stream</p>
              </div>
              <button className="btn-outline">
                <Settings size={18} className="mr-2" />
                Configurer
              </button>
            </div>
          </div>
        </div>

        {/* WebTV Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Tv size={24} className="text-primary-600 mr-3" />
              <h2 className="text-xl font-bold">WebTV</h2>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              webtvStatus === 'online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-neutral-100 text-neutral-800'
            }`}>
              {webtvStatus === 'online' ? 'En Ligne' : 'Hors Ligne'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium">État du Stream</p>
                <p className="text-sm text-neutral-600">RTMP • 1080p</p>
              </div>
              <button
                className={`btn ${webtvStatus === 'online' ? 'btn-error' : 'btn-primary'}`}
                onClick={() => toggleStream('tv')}
                disabled={isLoading}
              >
                {webtvStatus === 'online' ? (
                  <Pause size={18} className="mr-2" />
                ) : (
                  <Play size={18} className="mr-2" />
                )}
                {webtvStatus === 'online' ? 'Arrêter' : 'Démarrer'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium">Configuration</p>
                <p className="text-sm text-neutral-600">Paramètres du stream</p>
              </div>
              <button className="btn-outline">
                <Settings size={18} className="mr-2" />
                Configurer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Statistiques des Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Auditeurs WebRadio</p>
            <p className="text-2xl font-bold mt-1">127</p>
            <p className="text-sm text-green-600">+12% cette semaine</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Spectateurs WebTV</p>
            <p className="text-2xl font-bold mt-1">45</p>
            <p className="text-sm text-green-600">+8% cette semaine</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Bande Passante</p>
            <p className="text-2xl font-bold mt-1">1.2 TB</p>
            <p className="text-sm text-neutral-600">Ce mois</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Temps de Diffusion</p>
            <p className="text-2xl font-bold mt-1">168h</p>
            <p className="text-sm text-neutral-600">Ce mois</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamsPage;