import { useState, useCallback } from 'react';
import { useSermonsData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';
import { useDataStore } from '../services/dataService';

export interface Sermon {
  id: string;
  preacher: string;
  date: string;
  type: string;
  duration: string;
  tags: string[];
  availableLanguages: string[];
  language: string;
  location: string;
  translations: ContentTranslations[];
}

interface SermonsState {
  sermons: Sermon[];
  loading: boolean;
  error: string | null;
  fetchSermons: () => Promise<void>;
}

export const useSermonsStore = () : SermonsState => {
  const { sermons, loading, error, fetchData } = useDataStore(state => ({
    sermons: state.sermons,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
  }));

  // fetchData charge tout, donc tu peux l'utiliser pour rafraîchir les sermons si besoin
  return {
    sermons,
    loading,
    error,
    fetchSermons: fetchData,
  };
};