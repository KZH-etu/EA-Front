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
  addTag: (tag: Tags) => Promise<void>;
  updateTag: (id: string, tag: Partial<Tags>) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}

export const useTagsStore = (): TagsState => {
  const { tags, loading, error } = useTagsData();
  const [state, setState] = useState<TagsState>({
    tags: [],
    loading: false,
    error: null,
    fetchTags: async () => {},
    addTag: async () => {},
    updateTag: async () => {},
    deleteTag: async () => {}
  });

  const fetchTags = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, tags, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch tags', loading: false }));
    }
  }, [tags]);

  const addTag = useCallback(async (tag: Tags) => {
    // Assuming there's a function to add a tag in the data layer
    await useTagsData().addItem('tags', tag);
    fetchTags();
  }, [fetchTags]);

  const updateTag = useCallback(async (id: string, tag: Partial<Tags>) => {
    // Assuming there's a function to update a tag in the data layer
    await useTagsData().updateItem('tags', id, tag);
    fetchTags();
  }, [fetchTags]);

  const deleteTag = useCallback(async (id: string) => {
    // Assuming there's a function to delete a tag in the data layer
    await useTagsData().deleteItem('tags', id);
    fetchTags();
  }, [fetchTags]);

  return {
    tags,
    loading,
    error,
    fetchTags,
    addTag,
    updateTag,
    deleteTag
  };
};