import { useState, useEffect } from 'react';
import { useLanguageStore } from '../stores/useLanguageStore';
import { translationService } from '../services/translationService';

export const useAutoTranslation = (content: string | string[], sourceLang: string = 'fr') => {
  const { currentLanguage } = useLanguageStore();
  const [translatedContent, setTranslatedContent] = useState<string | string[]>(content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const translateContent = async () => {
      if (currentLanguage === sourceLang) {
        setTranslatedContent(content);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (Array.isArray(content)) {
          const translations = await translationService.translateBatch(content, currentLanguage);
          setTranslatedContent(translations);
        } else {
          const translation = await translationService.translate(content, currentLanguage);
          setTranslatedContent(translation);
        }
      } catch (err) {
        setError('Translation failed');
        setTranslatedContent(content); // Fallback to original content
      } finally {
        setIsLoading(false);
      }
    };

    translateContent();
  }, [content, currentLanguage, sourceLang]);

  return { translatedContent, isLoading, error };
};