import { useState, useCallback } from 'react';
import { useSermonsData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';

export interface Sermon {
  id: string;
  preacher: string;
  date: string;
  views: number;
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
  incrementViews: (sermonId: string) => void;
}

export const useSermonsStore = (): SermonsState => {
  const { sermons, loading, error, updateItem } = useSermonsData();
  const [state, setState] = useState<SermonsState>({
    sermons: [],
    loading: false,
    error: null,
    fetchSermons: async () => {},
    incrementViews: () => {}
  });

  const fetchSermons = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, sermons, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch sermons', loading: false }));
    }
  }, [sermons]);

  const incrementViews = useCallback((sermonId: string) => {
    const sermon = sermons.find(s => s.id === sermonId);
    if (sermon) {
      updateItem('sermons', sermonId, { views: sermon.views + 1 });
    }
  }, [sermons, updateItem]);

  return {
    sermons,
    loading,
    error,
    fetchSermons,
    incrementViews
  };
};