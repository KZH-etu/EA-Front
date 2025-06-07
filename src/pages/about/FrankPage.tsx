import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Section from '../../components/ui/Section';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useAboutStore } from '../../stores/useAboutStore';

const FrankPage = () => {
  const { sections, loading, error } = useAboutStore();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();
  
  const frankSections = sections
    .filter(section => section.entity === 'frank' && !section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }))
    .sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16">
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Ewald Frank" 
        subtitle="Découvrez le ministère d'Ewald Frank"
        backgroundImage="https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg"
      />
      
      <div className="container mx-auto px-4 py-12">
        {frankSections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            shortDescription={section.shortDescription ? section.shortDescription : ''}
            mainImage={section.mainImage}
            links={section.links}
          />
        ))}
      </div>
    </div>
  );
};

export default FrankPage