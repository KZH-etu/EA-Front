import { useDataStore } from '../services/dataService';

// Custom hook for accessing data store with type safety
export function useData<T extends keyof ReturnType<typeof useDataStore.getState>>(
  selector: (state: ReturnType<typeof useDataStore.getState>) => ReturnType<typeof useDataStore.getState>[T]
) {
  return useDataStore(selector);
}

// Specialized hooks for specific data types
export const useSermonsData = () => {
  const { sermons, loading, error, addItem, updateItem, deleteItem } = useDataStore();
  return { sermons, loading, error, addItem, updateItem, deleteItem };
};

export const useBooksData = () => {
  const { books, loading, error, addItem, updateItem, deleteItem } = useDataStore();
  return { books, loading, error, addItem, updateItem, deleteItem };
};

export const useEventsData = () => {
  const { events, loading, error, addItem, updateItem, deleteItem } = useDataStore();
  return { events, loading, error, addItem, updateItem, deleteItem };
};

export const useTagsData = () => {
  const { tags, loading, error, addItem, updateItem, deleteItem } = useDataStore();
  return { tags, loading, error, addItem, updateItem, deleteItem };
};

export const useAboutData = () => {
  const { aboutSections, aboutDetails, loading, error, addItem, updateItem, deleteItem, reorderItems } = useDataStore();
  return { aboutSections, aboutDetails, loading, error, addItem, updateItem, deleteItem, reorderItems };
};