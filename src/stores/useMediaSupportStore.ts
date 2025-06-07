import { useDataStore } from "../services/dataService";

export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export interface MediaSupport {
  id: string;
  documentVersionId: string;
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

export const useMediaSupportsStore = (): MediaSupportsState => {
  const {
    mediaSupports,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  } = useDataStore(state => ({
    mediaSupports: state.mediaSupports,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
  }));

  return {
    mediaSupports,
    loading,
    error,
    fetchMediaSupports: fetchData,
    addMediaSupport: (mediaSupport) => addItem('mediaSupports', mediaSupport),
    updateMediaSupport: (id, mediaSupport) => updateItem('mediaSupports', id, mediaSupport),
    deleteMediaSupport: (id) => deleteItem('mediaSupports', id),
  };
};