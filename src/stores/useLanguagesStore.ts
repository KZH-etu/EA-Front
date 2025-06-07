import { useCallback, useState } from 'react';
import { useAboutData, useLanguagesData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';

export enum LanguageType {
  INTERNATIONAL = 'International',
  LOCAL = 'Local',
}

export interface Language {
  id: string;
  title: string;
  type: LanguageType;
  origin?: string;
}

interface LanguageStore {
  languages: Language[];
  loading: boolean;
  error: string | null;
  fetchLanguages: () => Promise<void>;
  addLanguage: (language: Language) => Promise<void>;
  updateLanguage: (id: string,  language: Partial<Language> ) => Promise<void>;
  deleteLanguage: (id: string) => Promise<void>;
}

export const useLanguagesStore = (): LanguageStore => {
  const { languages, loading, error, addItem, updateItem, deleteItem } = useLanguagesData();
  const [state, setState] = useState<LanguageStore>({
    languages: [],
    loading: false,
    error: null,
    fetchLanguages: async () => {},
    addLanguage: async () => {},
    updateLanguage: async () => {},
    deleteLanguage: async () => {}
  });

  const fetchLanguages = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, languages, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch tags', loading: false }));
    }
  }, [languages]);

  const addLanguage = useCallback(async (language: Language) => {
    await addItem('languages', language);
    fetchLanguages();
  }, [fetchLanguages]);

  const updateLanguage = useCallback(async (id: string, language: Partial<Language>) => {
    await updateItem('languages', id, language);
    fetchLanguages();
  }, [fetchLanguages]);

  const deleteLanguage = useCallback(async (id: string) => {
    await deleteItem('languages', id);
    fetchLanguages();
  }, [fetchLanguages]);

  return {
    languages,
    loading,
    error,
    fetchLanguages,
    addLanguage,
    updateLanguage,
    deleteLanguage
  };
};