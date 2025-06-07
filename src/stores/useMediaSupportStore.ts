import { useCallback, useState } from "react";
import { useMediaSupportsData } from "../hooks/useData";

export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export interface MediaSupport {
  id: string;
  mediaVersionId: string;
  mediaType: MediaType;
  url: string;
  title?: string;
}

interface MediaSupportsState {
  mediaSupports: MediaSupport[];
  loading: boolean;
  error: string | null;
  fetchMediaSupports: () => Promise<void>;
  addMediaSupport: (entity: MediaSupport) => Promise<void>;
  updateMediaSupport: (id: string, entity: Partial<MediaSupport>) => Promise<void>;
  deleteMediaSupport: (id: string) => Promise<void>;
}

export const useEntitiesStore = (): MediaSupportsState => {
  const { mediaSupports, loading, error, addItem, updateItem, deleteItem } = useMediaSupportsData();
  const [state, setState] = useState<MediaSupportsState>({
    mediaSupports: [],
    loading: false,
    error: null,
    fetchMediaSupports: async () => {},
    addMediaSupport: async () => {},
    updateMediaSupport: async () => {},
    deleteMediaSupport: async () => {}
  });

  const fetchMediaSupports = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, mediaSupports, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch entities', loading: false }));
    }
  }, [mediaSupports]);

  const addMediaSupport = useCallback(async (mediaSupports: MediaSupport) => {
    await addItem('mediaSupports', mediaSupports);
    fetchMediaSupports();
  }, [addItem, fetchMediaSupports]);

  const updateMediaSupport = useCallback(async (id: string, mediaSupports: Partial<MediaSupport>) => {
    await updateItem('mediaSupports', id, mediaSupports);
    fetchMediaSupports();
  }, [updateItem, fetchMediaSupports]);

  const deleteMediaSupport = useCallback(async (id: string) => {
    await deleteItem('mediaSupports', id);
    fetchMediaSupports();
  }, [deleteItem, fetchMediaSupports]);

  return {
    mediaSupports,
    loading,
    error,
    fetchMediaSupports,
    addMediaSupport,
    updateMediaSupport,
    deleteMediaSupport
  };
};