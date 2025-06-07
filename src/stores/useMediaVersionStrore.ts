import { useState, useCallback } from 'react';
import { useEntitiesData, useMediaVersionsData, useSermonsData } from '../hooks/useData';

export interface MediaVersion {
  id: string;
  documentId: string;
  language: string;
  title: string;
  description?: string;
  publishedAt?: Date;
}

interface MediaVersionsState {
  mediaVersions: MediaVersion[];
  loading: boolean;
  error: string | null;
  fetchMediaVersions: () => Promise<void>;
  addMediaVersion: (entity: MediaVersion) => Promise<void>;
  updateMediaVersion: (id: string, entity: Partial<MediaVersion>) => Promise<void>;
  deleteMediaVersion: (id: string) => Promise<void>;
}

export const useEntitiesStore = (): MediaVersionsState => {
  const { mediaVersions, loading, error, addItem, updateItem, deleteItem } = useMediaVersionsData();
  const [state, setState] = useState<MediaVersionsState>({
    mediaVersions: [],
    loading: false,
    error: null,
    fetchMediaVersions: async () => {},
    addMediaVersion: async () => {},
    updateMediaVersion: async () => {},
    deleteMediaVersion: async () => {}
  });

  const fetchMediaVersions = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, mediaVersions, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch entities', loading: false }));
    }
  }, [mediaVersions]);

  const addMediaVersion = useCallback(async (mediaVersions: MediaVersion) => {
    await addItem('mediaVersions', mediaVersions);
    fetchMediaVersions();
  }, [addItem, fetchMediaVersions]);

  const updateMediaVersion = useCallback(async (id: string, mediaVersions: Partial<MediaVersion>) => {
    await updateItem('mediaVersions', id, mediaVersions);
    fetchMediaVersions();
  }, [updateItem, fetchMediaVersions]);

  const deleteMediaVersion = useCallback(async (id: string) => {
    await deleteItem('mediaVersions', id);
    fetchMediaVersions();
  }, [deleteItem, fetchMediaVersions]);

  return {
    mediaVersions,
    loading,
    error,
    fetchMediaVersions,
    addMediaVersion,
    updateMediaVersion,
    deleteMediaVersion
  };
};