import { useCallback, useState } from 'react';
import { useAboutData, useLanguagesData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';
import { useDataStore } from '../services/dataService';

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

export const useLanguagesStore = () : LanguageStore => {
  const { languages, loading, error, fetchData, addItem, updateItem, deleteItem} = useDataStore(state => ({
    languages: state.languages,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
  }));

  // fetchData charge tout, donc tu peux l'utiliser pour rafraîchir les sermons si besoin
  return {
    languages,
    loading,
    error,
    fetchLanguages: fetchData,
    addLanguage: (language: Language) => addItem('languages', language),
    updateLanguage: (id: string, language: Partial<Language>) => updateItem('languages', id, language),
    deleteLanguage: (id: string) => deleteItem('languages', id),
  };
};