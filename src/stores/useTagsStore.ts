import { useState, useCallback } from 'react';
import { useTagsData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';

export interface Tags {
  id: string;
  language: string;
  translations: ContentTranslations[];
}

interface TagsState {
  tags: Tags[];
  loading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
}

export const useTagsStore = (): TagsState => {
  const { tags, loading, error } = useTagsData();
  const [state, setState] = useState<TagsState>({
    tags: [],
    loading: false,
    error: null,
    fetchTags: async () => {}
  });

  const fetchTags = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, tags, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch tags', loading: false }));
    }
  }, [tags]);

  return {
    tags,
    loading,
    error,
    fetchTags
  };
};