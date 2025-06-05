import { useEffect } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { 
  BarChart, 
  FileText, 
  BookOpen, 
  Calendar, 
  Users, 
  Radio, 
  MessageSquare,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DashboardPage = () => {
  const { stats, sermons, events, loading, error, fetchData } = useAdminStore();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Sermons',
      value: stats.sermons,
      change: '+12%',
      increasing: true,
      icon: FileText,
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'Livres',
      value: stats.books,
      change: '+5%',
      increasing: true,
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Événements',
      value: stats.events,
      change: '0%',
      increasing: false,
      icon: Calendar,
      color: 'bg-secondary-100 text-secondary-600',
    },
    {
      title: 'Abonnés',
      value: stats.subscribers,
      change: '+18%',
      increasing: true,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">Tableau de Bord</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.increasing ? (
                    <ArrowUp size={16} className="text-green-500 mr-1" />
                  ) : stat.change !== '0%' ? (
                    <ArrowDown size={16} className="text-red-500 mr-1" />
                  ) : null}
                  <span className={stat.increasing ? 'text-green-500' : stat.change === '0%' ? 'text-neutral-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sermons */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Sermons Récents</h2>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left pb-3 font-medium text-neutral-500">Titre</th>
                  <th className="text-left pb-3 font-medium text-neutral-500 hidden md:table-cell">Prédicateur</th>
                  <th className="text-left pb-3 font-medium text-neutral-500">Date</th>
                  <th className="text-right pb-3 font-medium text-neutral-500">Vues</th>
                </tr>
              </thead>
              <tbody>
                {sermons.map((sermon) => (
                  <tr key={sermon.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 font-medium">{sermon.translations.find(val => val.lang === 'fr')?.title}</td>
                    <td className="py-4 text-neutral-600 hidden md:table-cell">{sermon.preacher}</td>
                    <td className="py-4 text-neutral-600">
                      {format(new Date(sermon.date), 'dd MMM', { locale: fr })}
                    </td>
                    <td className="py-4 text-right text-neutral-600">{sermon.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Événements à Venir</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {events.map((event) => (
                <li key={event.id} className="flex items-start space-x-4">
                  <div className="bg-primary-100 text-primary-700 rounded-lg p-3 text-center flex-shrink-0 w-14">
                    <span className="block text-xs">
                      {format(new Date(event.date), 'MMM', { locale: fr })}
                    </span>
                    <span className="block text-lg font-bold">
                      {format(new Date(event.date), 'dd')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{event.translations.find(val => val.lang === 'fr')?.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {format(new Date(event.date), 'HH:mm')} • {event.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stream Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Statistiques des Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Auditeurs WebRadio</p>
            <p className="text-2xl font-bold mt-1">{stats.webradioListeners}</p>
            <p className="text-sm text-green-600">+12% cette semaine</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Spectateurs WebTV</p>
            <p className="text-2xl font-bold mt-1">{stats.webtvViewers}</p>
            <p className="text-sm text-green-600">+8% cette semaine</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Bande Passante</p>
            <p className="text-2xl font-bold mt-1">{stats.bandwidth}</p>
            <p className="text-sm text-neutral-600">Ce mois</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">Temps de Diffusion</p>
            <p className="text-2xl font-bold mt-1">{stats.streamingTime}</p>
            <p className="text-sm text-neutral-600">Ce mois</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;