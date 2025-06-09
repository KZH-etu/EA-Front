// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Calendar, BookOpen, Radio, Tv, ChevronRight } from 'lucide-react';
// import SermonCard from '../components/sermons/SermonCard';
// import EventCard from '../components/events/EventCard';
// import { useSermonsStore } from '../stores/useSermonsStore';
// import { useEventsStore } from '../stores/useEventsStore';
// import { useLanguageStore } from '../stores/useFrontEndLanguageStore';
// import { useTranslation } from '../hooks/useTranslation';

// const videos = [
//   {
//     url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c6efbd7559b.mp4",
//     titleByLang: {
//       fr: "Culte du dimanche",
//       en: "Sunday Service",
//       es: "Servicio Dominical"
//     }
//   },
//   {
//     url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c6efe7b6441.mp4",
//     titleByLang: {
//       fr: "Étude biblique",
//       en: "Bible Study",
//       es: "Estudio Bíblico"
//     }
//   },
//   {
//     url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c8d304a59fd.mp4",
//     titleByLang: {
//       fr: "Prière et adoration",
//       en: "Prayer and Worship",
//       es: "Oración y Adoración"
//     }
//   }
// ];

const HomePage = () => {
  return (
    <div>
      Hello
    </div>
  );
  // const { sermons, loading: sermonsLoading} = useSermonsStore();
  // const { events, loading: eventsLoading} = useEventsStore();
  // const [currentVideo, setCurrentVideo] = useState(0);
  // const { currentLanguage } = useLanguageStore();
  // const { t } = useTranslation();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentVideo((prev) => (prev + 1) % videos.length);
  //   }, 8000);
  //   return () => clearInterval(interval);
  // }, []);

  // const videoSermons = sermons
  //   .filter(sermon => sermon.type === 'video')
  //   .slice(0, 3)
  //   .map(sermon => ({
  //     ...sermon,
  //     title: sermon.translations.find(val => val.lang === currentLanguage)?.title || sermon.translations.find(val => val.lang === 'fr')?.title || '',
  //     description: sermon.translations.find(val => val.lang === currentLanguage)?.description || sermon.translations.find(val => val.lang === 'fr')?.description || '',
  //   }));

  // const audioSermons = sermons
  //   .filter(sermon => sermon.type === 'audio')
  //   .slice(0, 3)
  //   .map(sermon => ({
  //     ...sermon,
  //     title: sermon.translations.find(val => val.lang === currentLanguage)?.title || sermon.translations.find(val => val.lang === 'fr')?.title || '',
  //     description: sermon.translations.find(val => val.lang === currentLanguage)?.description || sermon.translations.find(val => val.lang === 'fr')?.description || '',
  //   }));

  // const upcomingEvents = events
  //   .slice(0, 2)
  //   .map(event => ({
  //     ...event,
  //     title: event.translations.find(val => val.lang === currentLanguage)?.title || event.translations.find(val => val.lang === 'fr')?.title || '',
  //     description: event.translations.find(val => val.lang === currentLanguage)?.description || event.translations.find(val => val.lang === 'fr')?.description || '',
  //   }));

  // return (
  //   <>
  //     {/* Hero Section with Video Carousel */}
  //     <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
  //       <div className="absolute inset-0 bg-neutral-900">
  //         <div className="absolute inset-0 bg-neutral-900/60 z-20"></div>
  //         {videos.map((video, index) => (
  //           <motion.div
  //             key={video.url}
  //             className="absolute inset-0"
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: currentVideo === index ? 1 : 0 }}
  //             transition={{ duration: 1.5, ease: "easeInOut" }}
  //           >
  //             <video
  //               className="w-full h-full object-cover"
  //               autoPlay
  //               muted
  //               playsInline
  //               loop
  //             >
  //               <source src={video.url} type="video/mp4" />
  //             </video>
  //           </motion.div>
  //         ))}
  //       </div>

  //       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
  //         {videos.map((_, index) => (
  //           <button
  //             key={index}
  //             onClick={() => setCurrentVideo(index)}
  //             className={`w-2 h-2 rounded-full transition-all duration-300 ${
  //               index === currentVideo ? 'bg-white w-4' : 'bg-white/50'
  //             }`}
  //           ></button>
  //         ))}
  //       </div>
        
  //       <div className="container-custom relative z-30 px-4 flex h-full items-center">
  //         <div className="ml-auto max-w-lg text-right">
  //           <motion.h1 
  //             className="text-3xl md:text-4xl font-bold mb-4 text-white"
  //             initial={{ opacity: 0, x: 20 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.5 }}
  //           >
  //             {t('home.hero.title')}
  //           </motion.h1>
            
  //           <motion.p 
  //             className="text-2xl md:text-3xl max-w-3xl mb-8 text-white"
  //             initial={{ opacity: 0, x: 20 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.5, delay: 0.2 }}
  //           >
  //             {t('home.hero.subtitle')}
  //           </motion.p>
            
  //           <motion.div 
  //             className="flex flex-col sm:flex-row justify-end gap-4"
  //             initial={{ opacity: 0, x: 20 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.5, delay: 0.4 }}
  //           >
  //             <Link to="/about" className="btn-primary">
  //               {t('common.readMore')}
  //             </Link>
  //             <Link to="/sermons/video" className="btn-outline border-white text-white hover:bg-white/10">
  //               {t('home.hero.discoverSermons')}
  //             </Link>
  //           </motion.div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Welcome/About Section */}
  //     <section className="section bg-white">
  //       <div className="container-custom">
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  //           <div>
  //             <h2 className="text-3xl font-bold mb-6">{t('home.mission.title')}</h2>
  //             <p className="text-lg text-neutral-700 mb-6">
  //               {t('home.mission.description1')}
  //             </p>
  //             <p className="text-lg text-neutral-700 mb-6">
  //               {t('home.mission.description2')}
  //             </p>
  //             <Link to="/about" className="btn-primary">
  //               {t('home.mission.discoverHistory')}
  //             </Link>
  //           </div>
            
  //           <div className="relative">
  //             <img 
  //               src="https://images.pexels.com/photos/2258248/pexels-photo-2258248.jpeg" 
  //               alt={t('home.mission.imageAlt')}
  //               className="rounded-lg shadow-xl w-full h-[400px] object-cover"
  //             />
  //             <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-6 rounded-lg shadow-lg max-w-[300px]">
  //               <p className="font-semibold text-xl">
  //                 {t('home.mission.quote')}
  //               </p>
  //               <p className="text-white/80 mt-2">{t('home.mission.quoteRef')}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Latest Video Sermons Section */}
  //     <section className="section bg-neutral-100">
  //       <div className="container-custom">
  //         <div className="text-center mb-12">
  //           <h2 className="text-3xl font-bold mb-4">{t('home.videoSermons.title')}</h2>
  //           <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
  //             {t('home.videoSermons.subtitle')}
  //           </p>
  //         </div>
          
  //         {sermonsLoading ? (
  //           <div className="flex justify-center">
  //             <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //             {videoSermons.map((sermon) => (
  //               <SermonCard key={sermon.id} sermon={sermon} />
  //             ))}
  //           </div>
  //         )}
          
  //         <div className="text-center mt-10">
  //           <Link to="/sermons/video" className="btn-outline">
  //             {t('home.videoSermons.seeAll')}
  //           </Link>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Latest Audio Sermons Section */}
  //     <section className="section bg-white">
  //       <div className="container-custom">
  //         <div className="text-center mb-12">
  //           <h2 className="text-3xl font-bold mb-4">{t('home.audioSermons.title')}</h2>
  //           <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
  //             {t('home.audioSermons.subtitle')}
  //           </p>
  //         </div>
          
  //         {sermonsLoading ? (
  //           <div className="flex justify-center">
  //             <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //             {audioSermons.map((sermon) => (
  //               <SermonCard key={sermon.id} sermon={sermon} />
  //             ))}
  //           </div>
  //         )}
          
  //         <div className="text-center mt-10">
  //           <Link to="/sermons/audio" className="btn-outline">
  //             {t('home.audioSermons.seeAll')}
  //           </Link>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Upcoming Events Section */}
  //     <section className="section bg-neutral-100">
  //       <div className="container-custom">
  //         <div className="text-center mb-12">
  //           <h2 className="text-3xl font-bold mb-4">{t('home.events.title')}</h2>
  //           <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
  //             {t('home.events.subtitle')}
  //           </p>
  //         </div>
          
  //         {eventsLoading ? (
  //           <div className="flex justify-center">
  //             <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  //             {upcomingEvents.map((event) => (
  //               <EventCard key={event.id} event={event} />
  //             ))}
  //           </div>
  //         )}
          
  //         <div className="text-center mt-10">
  //           <Link to="/events" className="btn-outline">
  //             {t('home.events.seeAll')}
  //           </Link>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Media Showcase Section */}
  //     <section className="section bg-neutral-900 text-white">
  //       <div className="container-custom">
  //         <div className="text-center mb-12">
  //           <h2 className="text-3xl font-bold mb-4 text-white">{t('home.media.title')}</h2>
  //           <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
  //             {t('home.media.subtitle')}
  //           </p>
  //         </div>
          
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //           {/* WebRadio Card */}
  //           <div className="bg-neutral-800 rounded-lg p-8 text-center hover:bg-neutral-700 transition-colors duration-300">
  //             <Radio size={48} className="text-primary-500 mx-auto mb-4" />
  //             <h3 className="text-2xl font-bold mb-2 text-white">{t('nav.webradio')}</h3>
  //             <p className="text-neutral-300 mb-6">
  //               {t('home.media.webradioDescription')}
  //             </p>
  //             <Link to="/webradio" className="btn-primary inline-block">
  //               {t('home.media.listenNow')}
  //             </Link>
  //           </div>
            
  //           {/* WebTV Card */}
  //           <div className="bg-neutral-800 rounded-lg p-8 text-center hover:bg-neutral-700 transition-colors duration-300">
  //             <Tv size={48} className="text-primary-500 mx-auto mb-4" />
  //             <h3 className="text-2xl font-bold mb-2 text-white">{t('nav.webtv')}</h3>
  //             <p className="text-neutral-300 mb-6">
  //               {t('home.media.webtvDescription')}
  //             </p>
  //             <Link to="/webtv" className="btn-primary inline-block">
  //               {t('home.media.watchNow')}
  //             </Link>
  //           </div>
            
  //           {/* Books Card */}
  //           <div className="bg-neutral-800 rounded-lg p-8 text-center hover:bg-neutral-700 transition-colors duration-300">
  //             <BookOpen size={48} className="text-primary-500 mx-auto mb-4" />
  //             <h3 className="text-2xl font-bold mb-2 text-white">{t('home.media.booksTitle')}</h3>
  //             <p className="text-neutral-300 mb-6">
  //               {t('home.media.booksDescription')}
  //             </p>
  //             <Link to="/books" className="btn-primary inline-block">
  //               {t('home.media.download')}
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Newsletter Section */}
  //     <section className="py-16 bg-neutral-100">
  //       <div className="container-custom max-w-4xl">
  //         <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
  //           <h2 className="text-3xl font-bold mb-4 text-center">{t('home.newsletter.title')}</h2>
  //           <p className="text-lg text-neutral-600 text-center mb-8">
  //             {t('home.newsletter.subtitle')}
  //           </p>
            
  //           <form className="max-w-lg mx-auto">
  //             <div className="flex flex-col md:flex-row gap-4">
  //               <input
  //                 type="email"
  //                 placeholder={t('home.newsletter.emailPlaceholder')}
  //                 className="form-input flex-grow"
  //                 required
  //               />
  //               <button type="submit" className="btn-primary">
  //                 {t('home.newsletter.subscribe')}
  //               </button>
  //             </div>
  //             <p className="text-sm text-neutral-500 mt-4 text-center">
  //               {t('home.newsletter.privacyNotice')}
  //             </p>
  //           </form>
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // );
};

export default HomePage;