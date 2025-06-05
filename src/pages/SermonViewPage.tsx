import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Video, Headphones, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import PageHeader from '../components/ui/PageHeader';
import ScrollableSermonList from '../components/sermons/ScrollableSermonList';
import { useSermonsStore } from '../stores/useSermonsStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useTranslation } from '../hooks/useTranslation';
import ReactPlayer from 'react-player';
import LanguageSelector from '../components/ui/LanguageSelector';

const SermonViewPage = () => {
  const { id } = useParams();
  const { sermons, loading, error } = useSermonsStore();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [sermon, setSermon] = useState<any>(null);
  const [relatedSermons, setRelatedSermons] = useState<{
    byPreacher: any[];
    byTags: { tag: string; sermons: any[] }[];
  }>({
    byPreacher: [],
    byTags: []
  });
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [actionType, setActionType] = useState<'watch' | 'listen' | 'download' | null>(null);

  useEffect(() => {
    if (sermons.length && id) {
      const foundSermon = sermons.find(s => s.id === id);
      
      if (foundSermon) {
        setSermon({
          ...foundSermon,
          title: foundSermon.titleByLang[currentLanguage] || foundSermon.titleByLang['fr'],
          description: foundSermon.descriptionByLang[currentLanguage] || foundSermon.descriptionByLang['fr']
        });

        // Get sermons by same preacher
        const preacherSermons = sermons
          .filter(s => s.preacher === foundSermon.preacher && s.id !== foundSermon.id)
          .map(s => ({
            ...s,
            title: s.titleByLang[currentLanguage] || s.titleByLang['fr'],
            description: s.descriptionByLang[currentLanguage] || s.descriptionByLang['fr']
          }));

        // Get sermons by tags
        const tagGroups = foundSermon.tags.map(tag => ({
          tag,
          sermons: sermons
            .filter(s => s.id !== foundSermon.id && s.tags.includes(tag))
            .map(s => ({
              ...s,
              title: s.titleByLang[currentLanguage] || s.titleByLang['fr'],
              description: s.descriptionByLang[currentLanguage] || s.descriptionByLang['fr']
            }))
            .slice(0, 10)
        })).filter(group => group.sermons.length > 0);

        setRelatedSermons({
          byPreacher: preacherSermons,
          byTags: tagGroups
        });
      }
    }
  }, [sermons, id, currentLanguage]);

  const handleAction = (action: 'watch' | 'listen' | 'download') => {
    setActionType(action);
    setShowLanguageSelector(true);
  };

  const handleLanguageSelect = (langCode: string) => {
    if (!sermon || !actionType) return;

    let url;
    switch (actionType) {
      case 'watch':
        url = sermon.videoUrlByLang[langCode];
        break;
      case 'listen':
        url = sermon.audioUrlByLang[langCode];
        break;
      case 'download':
        url = sermon.downloadUrlByLang[langCode];
        break;
    }

    if (url) {
      if (actionType === 'download') {
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    }

    setShowLanguageSelector(false);
    setActionType(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="container-custom py-16">
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error || t('sermons.notFound')}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title={sermon.title}
        subtitle={`${t('common.preacher')}: ${sermon.preacher}`}
        backgroundImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <div className="container-custom">
        <div className="py-6">
          <Link 
            to={`/sermons/${sermon.type}`} 
            className="inline-flex items-center px-4 py-2 text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 text-neutral-500 group-hover:text-primary-500 transition-colors" />
            <span>{t('sermons.backToList')}</span>
          </Link>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {sermon.type === 'video' ? (
              <div className="aspect-video">
                {sermon.mediaUrl ? (
                  <ReactPlayer
                    url={sermon.mediaUrl}
                    width="100%"
                    height="100%"
                    controls
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1,
                          rel: 0
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="aspect-video bg-neutral-900 flex items-center justify-center">
                    <p className="text-white">{t('sermons.mediaNotAvailable')}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 bg-neutral-900 flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg"
                  alt="Audio waveform"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                {sermon.type === 'video' ? (
                  <Video size={24} className="text-primary-500" />
                ) : (
                  <Headphones size={24} className="text-primary-500" />
                )}
                <span className="text-lg font-medium capitalize">{t(`sermons.types.${sermon.type}`)}</span>
              </div>
              <div className="flex items-center text-neutral-500">
                <Eye size={20} className="mr-2" />
                <span>{sermon.views} {t('sermons.views')}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-neutral-600">
                <User size={20} className="mr-2" />
                <span>{sermon.preacher}</span>
              </div>

              <div className="flex items-center text-neutral-600">
                <Calendar size={20} className="mr-2" />
                <span>{format(new Date(sermon.date), 'dd MMMM yyyy', { locale: fr })}</span>
              </div>

              {sermon.tags && sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sermon.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {sermon.type === 'video' ? (
                  <button
                    onClick={() => handleAction('watch')}
                    className="btn-primary"
                  >
                    {t('common.watch')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction('listen')}
                    className="btn-primary"
                  >
                    {t('common.listen')}
                  </button>
                )}
                <button
                  onClick={() => handleAction('download')}
                  className="btn-outline"
                >
                  {t('common.download')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Sermons Sections */}
        <section className="pb-16">
          <div className="container-custom">
            {/* Sermons by same preacher */}
            <ScrollableSermonList
              title={t('sermons.otherSermonsByPreacher', { preacher: sermon.preacher })}
              sermons={relatedSermons.byPreacher}
            />

            {/* Sermons by tags */}
            {relatedSermons.byTags.map(({ tag, sermons }) => (
              <ScrollableSermonList
                key={tag}
                title={t('sermons.sermonsWithTag', { tag })}
                sermons={sermons}
              />
            ))}
          </div>
        </section>

        <LanguageSelector
          isOpen={showLanguageSelector}
          onClose={() => {
            setShowLanguageSelector(false);
            setActionType(null);
          }}
          onSelect={handleLanguageSelect}
          availableLanguages={sermon?.availableLanguages || []}
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
};

export default SermonViewPage;