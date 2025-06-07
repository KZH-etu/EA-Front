import { useState, useCallback } from 'react';
import { useEntitiesData, useMediaVersionsData, useSermonsData } from '../hooks/useData';
import { useDataStore } from '../services/dataService';
import { Language } from './useLanguageStore';

export interface MediaVersion {
  id: string;
  documentId: string;
  languageId: string;
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

export const useMediaVersionsStore = (): MediaVersionsState => {
  const {
    mediaVersions,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  } = useDataStore(state => ({
    mediaVersions: state.mediaVersions,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
  }));

  return {
    mediaVersions,
    loading,
    error,
    fetchMediaVersions: fetchData,
    addMediaVersion: (mediaVersion) => addItem('mediaVersions', mediaVersion),
    updateMediaVersion: (id, mediaVersion) => updateItem('mediaVersions', id, mediaVersion),
    deleteMediaVersion: (id) => deleteItem('mediaVersions', id),
  };
};