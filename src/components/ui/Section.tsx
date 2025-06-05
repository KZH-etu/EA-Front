import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface SectionProps {
  title?: string | string[];
  shortDescription: string | string[];
  content?: string;
  mainImage?: string;
  links?: Array<{ text: string; url: string; }>;
}

const Section = ({ title, shortDescription, content, mainImage, links }: SectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto mb-20">
      {title && (
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
      )}
      
      <div className="prose prose-lg mb-12">
        {Array.isArray(shortDescription) ? (
          shortDescription.map((paragraph, index) => (
            <p key={index} className="text-lg text-neutral-700 mb-6">{paragraph}</p>
          ))
        ) : (
          <p className="text-lg text-neutral-700 mb-6">{shortDescription}</p>
        )}
        {content && (
          <p className="text-lg text-neutral-700 mb-6">{content}</p>
        )}
        {links && links.length > 0 && (
          <div className="flex gap-4 mt-8">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className={index === 0 ? "btn-primary" : "btn-outline"}
              >
                {link.text}
                <ChevronRight size={20} className="ml-2" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {mainImage && (
        <div className="mt-12">
          <img 
            src={mainImage} 
            alt={title || t('common.sectionImage')} 
            className="rounded-lg shadow-xl w-full max-w-3xl mx-auto"
          />
        </div>
      )}
    </section>
  );
};

export default Section;