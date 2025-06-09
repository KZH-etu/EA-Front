// import React from 'react';
// import PageHeader from '../../components/ui/PageHeader';
// import Section from '../../components/ui/Section';
// import { useLanguageStore } from '../../stores/useFrontEndLanguageStore';
// import { useTranslation } from '../../hooks/useTranslation';
// import { useAboutStore } from '../../stores/useAboutStore';

const BranhamPage = () => {
  return (
    <div>
      Hello
    </div>
  );
  // const { sections, loading, error } = useAboutStore();
  // const { currentLanguage } = useLanguageStore();
  // const { t } = useTranslation();
  
  // const branhamSections = sections
  //   .filter(section => section.entity === 'branham' && !section.isIntro)
  //   .map(section => ({
  //     ...section,
  //     title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
  //     shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
  //   }))
  //   .sort((a, b) => a.order - b.order);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center py-12">
  //       <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="container-custom py-16">
  //       <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
  //         {error}
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <PageHeader 
  //       title="William Marrion Branham" 
  //       subtitle="Découvrez le ministère de William Marrion Branham"
  //       backgroundImage="https://images.pexels.com/photos/2635393/pexels-photo-2635393.jpeg"
  //     />
      
  //     <div className="container mx-auto px-4 py-12">
  //       {branhamSections.map((section) => (
  //         <Section
  //           key={section.id}
  //           title={section.title}
  //           shortDescription={section.shortDescription ? section.shortDescription : ''}
  //           mainImage={section.mainImage}
  //           links={section.links}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default BranhamPage