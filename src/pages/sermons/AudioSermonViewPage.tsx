// import { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Calendar, User, Tag, ArrowLeft, Globe, Clock,
//   Play, Pause, Volume2, VolumeX, SkipBack, SkipForward 
// } from 'lucide-react';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import PageHeader from '../../components/ui/PageHeader';
// import { useSermonsStore, Sermon } from '../../stores/useSermonsStore';
// import { useTagsStore } from '../../stores/useTagsStore';
// import { useLanguageStore } from '../../stores/useLanguageStore';
// import { useTranslation } from '../../hooks/useTranslation';
// import LanguageSelector from '../../components/ui/LanguageSelector';

// // Composant pour la liste des sermons similaires
// const ScrollableSermonList = ({ title, sermons }: { title: string; sermons: Sermon[] }) => {
//   const { currentLanguage } = useLanguageStore();
  
//   return (
//     <div className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">{title}</h2>
//       <div className="space-y-4">
//         {sermons.map((sermon) => (
//           <Link 
//             key={sermon.id} 
//             to={`/sermons/audio/${sermon.id}`}
//             className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="w-20 h-20 bg-neutral-100 rounded flex-shrink-0">
//                 <img 
//                   src="https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg"
//                   alt={sermon.translations.find(t => t.lang === currentLanguage)?.title}
//                   className="w-full h-full object-cover rounded"
//                 />
//             </div>
//             <div>
//               <h3 className="font-bold text-neutral-900">
//                 {sermon.translations.find(t => t.lang === currentLanguage)?.title}
//               </h3>
//               <p className="text-sm text-neutral-600">{sermon.preacher}</p>
//               <p className="text-sm text-neutral-500">
//                 {format(new Date(sermon.date), 'dd MMM yyyy', { locale: fr })}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

function AudioSermonViewPage() {
  return (
    <div>
      Hello
    </div>
  );
  // const { id } = useParams();
  // const { sermons, loading, error, fetchSermons } = useSermonsStore();
  // const { tags } = useTagsStore();
  // const { currentLanguage } = useLanguageStore();
  // const { t } = useTranslation();
  // const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  // const [relatedSermons, setRelatedSermons] = useState<{
  //   byPreacher: Sermon[];
  //   byTags: { tag: string; sermons: Sermon[] }[];
  // }>({
  //   byPreacher: [],
  //   byTags: []
  // });
  // const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  // const [volume, setVolume] = useState(1);
  // const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   fetchSermons();
  // }, []);

  // useEffect(() => {
  //   if (sermons.length && id) {
  //     const sermon = sermons.find(s => s.id === id);
  //     if (sermon) {
  //       setCurrentSermon(sermon);

  //       // Sermons du même prédicateur
  //       const preacherSermons = sermons.filter(s => 
  //         s.preacher === sermon.preacher && s.id !== sermon.id
  //       );

  //       // Sermons avec tags similaires
  //       const tagGroups = sermon.tags.map(tagId => {
  //         const tag = tags.find(t => t.id === tagId);
  //         return {
  //           tag: tag?.translations.find(tr => tr.lang === currentLanguage)?.title || '',
  //           sermons: sermons.filter(s => 
  //             s.id !== sermon.id && 
  //             s.tags.includes(tagId)
  //           )
  //         };
  //       }).filter(group => group.sermons.length > 0);

  //       setRelatedSermons({
  //         byPreacher: preacherSermons,
  //         byTags: tagGroups
  //       });
  //     }
  //   }
  // }, [sermons, id, currentLanguage, tags]);

  // // Fonctions de contrôle audio
  // const togglePlay = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  // const toggleMute = () => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = !isMuted;
  //     setIsMuted(!isMuted);
  //   }
  // };

  // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newVolume = parseFloat(e.target.value);
  //   setVolume(newVolume);
  //   if (audioRef.current) {
  //     audioRef.current.volume = newVolume;
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  // // if (error || !currentSermon) {
  // //   return (
  // //     <div className="container-custom py-16">
  // //       <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
  // //         {error || t('sermons.notFound')}
  // //       </div>
  // //     </div>
  // //   );
  // // }

  // const translation = currentSermon?.translations.find(t => t.lang === currentLanguage);

  // return (
  //   <div>
  //     <PageHeader 
  //       title={translation?.title || ''}
  //       subtitle={`${t('common.preacher')}: ${currentSermon?.preacher}`}
  //       backgroundImage="https://images.pexels.com/photos/2774576/pexels-photo-2774576.jpeg"
  //     />
      
  //     <div className="container-custom">
  //       <div className="py-6">
  //         <Link 
  //           to="/sermons/audio" 
  //           className="inline-flex items-center px-4 py-2 text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm transition-colors group"
  //         >
  //           <ArrowLeft size={20} className="mr-2 text-neutral-500 group-hover:text-primary-500 transition-colors" />
  //           <span>{t('sermons.backToList')}</span>
  //         </Link>
  //       </div>

  //       <motion.div 
  //         className="bg-white rounded-lg shadow-xl overflow-hidden mb-12"
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5 }}
  //       >
  //         {/* Contenu principal */}
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
  //           {/* Lecteur audio */}
  //           <div className="md:col-span-3 space-y-6">
  //             <div className="flex flex-col space-y-4">
  //               {/* Contrôles de lecture */}
  //               <div className="flex items-center justify-center space-x-4">
  //                 <button className="p-2 hover:bg-neutral-100 rounded-full">
  //                   <SkipBack size={24} />
  //                 </button>
  //                 <button 
  //                   className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600"
  //                   onClick={togglePlay}
  //                 >
  //                   {isPlaying ? <Pause size={24} /> : <Play size={24} />}
  //                 </button>
  //                 <button className="p-2 hover:bg-neutral-100 rounded-full">
  //                   <SkipForward size={24} />
  //                 </button>
  //               </div>

  //               {/* Contrôle du volume */}
  //               <div className="flex items-center space-x-2">
  //                 <button 
  //                   className="p-2 hover:bg-neutral-100 rounded-full"
  //                   onClick={toggleMute}
  //                 >
  //                   {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
  //                 </button>
  //                 <input
  //                   type="range"
  //                   min="0"
  //                   max="1"
  //                   step="0.1"
  //                   value={volume}
  //                   onChange={handleVolumeChange}
  //                   className="w-full"
  //                 />
  //               </div>

  //               {/* Barre de progression */}
  //               <div className="w-full bg-neutral-200 rounded-full h-1.5">
  //                 <div className="bg-primary-500 h-1.5 rounded-full w-1/3"></div>
  //               </div>
  //             </div>

  //             {/* Métadonnées */}
  //             <div className="flex items-center gap-4 text-sm text-neutral-500">
  //               <div className="flex items-center">
  //                 <Clock size={16} className="mr-1" />
  //                 {currentSermon?.duration}
  //               </div>
  //               <div className="flex items-center">
  //                 <Calendar size={16} className="mr-1" />
  //                 {format(new Date(currentSermon?.date || ''), 'dd MMM yyyy', { locale: fr })}
  //               </div>
  //               <div className="flex items-center">
  //                 <User size={16} className="mr-1" />
  //                 {currentSermon?.preacher}
  //               </div>
  //             </div>

  //             {translation?.description && (
  //               <div>
  //                 <h2 className="text-xl font-bold mb-2">{t('sermons.description')}</h2>
  //                 <p className="text-neutral-600 whitespace-pre-line">
  //                   {translation.description}
  //                 </p>
  //               </div>
  //             )}

  //             {/* Tags */}
  //             {currentSermon?.tags && currentSermon?.tags.length > 0 && (
  //               <div>
  //                 <h2 className="text-xl font-bold mb-2">{t('common.tags')}</h2>
  //                 <div className="flex flex-wrap gap-2">
  //                   {currentSermon?.tags.map(tagId => {
  //                     const tag = tags.find(t => t.id === tagId);
  //                     const tagTranslation = tag?.translations.find(tr => tr.lang === currentLanguage);
  //                     return (
  //                       <span
  //                         key={tagId}
  //                         className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm flex items-center"
  //                       >
  //                         <Tag size={14} className="mr-1" />
  //                         {tagTranslation?.title || ''}
  //                       </span>
  //                     );
  //                   })}
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </motion.div>

  //       {/* Sections associées */}
  //       {relatedSermons.byPreacher.length > 0 && (
  //         <ScrollableSermonList
  //           title={`${t('sermons.otherSermonsByPreacher')} ${currentSermon?.preacher}`}
  //           sermons={relatedSermons.byPreacher}
  //         />
  //       )}

  //       {relatedSermons.byTags.map(({ tag, sermons }) => (
  //         <ScrollableSermonList
  //           key={tag}
  //           title={`${t('sermons.sermonsWithTag')} ${tag}`}
  //           sermons={sermons}
  //         />
  //       ))}

  //       <LanguageSelector
  //         isOpen={showLanguageSelector}
  //         onClose={() => setShowLanguageSelector(false)}
  //         onSelect={() => {}}
  //         availableLanguages={currentSermon?.translations.map(t => t.lang) || []}
  //         currentLanguage={currentLanguage}
  //       />

  //       {/* Element audio caché */}
  //       <audio 
  //         ref={audioRef}
  //         src={translation?.url}
  //         onEnded={() => setIsPlaying(false)}
  //       />
  //     </div>
  //   </div>
  // );
}

export default AudioSermonViewPage;