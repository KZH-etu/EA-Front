import { ContentTranslations } from '../lib/interfacesData';
import { useDataStore } from '../services/dataService';

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

export const useTagsStore = () : TagsState => {
  const { tags, loading, error, fetchData, addItem, updateItem, deleteItem, } = useDataStore(state => ({
    tags: state.tags,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
  }));

  // fetchData charge tout, donc tu peux l'utiliser pour rafraîchir les sermons si besoin
  return {
    tags,
    loading,
    error,
    fetchTags: fetchData,
    addTag: (tag: Tags) => addItem('tags', tag),
    updateTag: (id: string, tag: Partial<Tags>) => updateItem('tags', id, tag),
    deleteTag: (id: string) => deleteItem('tags', id),
  };
};