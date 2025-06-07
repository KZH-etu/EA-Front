import { useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import EventCard from '../components/events/EventCard';
import { motion } from 'framer-motion';
import { useEventsStore } from '../stores/useEventsStore';
import { useLanguageStore } from '../stores/useFrontEndLanguageStore';
import { useTranslation } from '../hooks/useTranslation';

const EventsPage = () => {
  const { events, loading, error, fetchEvents } = useEventsStore();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <PageHeader 
        title={t('nav.events')}
        subtitle={t('events.subtitle')}
        backgroundImage="https://images.pexels.com/photos/533982/pexels-photo-533982.jpeg"
      />
      
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-error">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <EventCard 
                    event={{
                      ...event,
                      title: event.translations.find(val => val.lang === currentLanguage)?.title || event.translations.find(val => val.lang === 'fr')?.title || '',
                      description: event.translations.find(val => val.lang === currentLanguage)?.description || event.translations.find(val => val.lang === 'fr')?.description || '',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;