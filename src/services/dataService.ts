import { create } from 'zustand';
import { mockAdminSermons, mockAdminBooks, mockAdminEvents, mockAdminTags, mockAdminSubscribers, mockAdminStats, mockAdminAboutSections, mockAdminAboutDetails, mockAdminEntities, mockAdminMediaVersions, mockAdminMediaSupport, mockAdminLanguages } from '../lib/mockAdminData';

// Central store for all data
interface DataState {
  mediaSupports: typeof mockAdminMediaSupport;
  mediaVersions: typeof mockAdminMediaVersions;
  entities: typeof mockAdminEntities;
  sermons: typeof mockAdminSermons;
  books: typeof mockAdminBooks;
  events: typeof mockAdminEvents;
  tags: typeof mockAdminTags;
  languages: typeof mockAdminLanguages
  subscribers: typeof mockAdminSubscribers;
  stats: typeof mockAdminStats;
  aboutSections: typeof mockAdminAboutSections;
  aboutDetails: typeof mockAdminAboutDetails;
  loading: boolean;
  error: string | null;
}

// Helper type to get array element type
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

interface DataStore extends DataState {
  fetchData: () => Promise<void>;
  addItem: <T extends keyof Omit<DataState, 'loading' | 'error'>>(
    type: T, 
    item: ArrayElement<DataState[T]>
  ) => Promise<void>;
  updateItem: <T extends keyof Omit<DataState, 'loading' | 'error'>>(
    type: T, 
    id: string, 
    item: Partial<ArrayElement<DataState[T]>>
  ) => Promise<void>;
  deleteItem: <T extends keyof Omit<DataState, 'loading' | 'error'>>(
    type: T, 
    id: string
  ) => Promise<void>;
  reorderItems: <T extends keyof Omit<DataState, 'loading' | 'error'>>(
    type: T, 
    items: DataState[T]
  ) => Promise<void>;
}

// Simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Create the central data store
export const useDataStore = create<DataStore>((set, get) => ({
  // Initial state
  mediaSupports: mockAdminMediaSupport,
  mediaVersions: mockAdminMediaVersions,
  entities: mockAdminEntities,
  sermons: mockAdminSermons,
  books: mockAdminBooks,
  events: mockAdminEvents,
  tags: mockAdminTags,
  languages: mockAdminLanguages,
  subscribers: mockAdminSubscribers,
  stats: mockAdminStats,
  aboutSections: mockAdminAboutSections,
  aboutDetails: mockAdminAboutDetails,
  loading: false,
  error: null,

  // Actions
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      await simulateDelay();
      set({
        mediaSupports: mockAdminMediaSupport,
        mediaVersions: mockAdminMediaVersions,
        entities: mockAdminEntities,
        sermons: mockAdminSermons,
        books: mockAdminBooks,
        events: mockAdminEvents,
        tags: mockAdminTags,
        languages: mockAdminLanguages,
        subscribers: mockAdminSubscribers,
        stats: mockAdminStats,
        aboutSections: mockAdminAboutSections,
        aboutDetails: mockAdminAboutDetails,
        loading: false
      });
    } catch (error) {
      set({ error: 'Failed to fetch data', loading: false });
    }
  },

  addItem: async (type, item) => {
    let newItem = {};
    set({ loading: true, error: null });
    try {
      await simulateDelay();
      if(type !== 'languages'){
        newItem = { ...item, id: Math.random().toString(36).substr(2, 9) } as any;
      }else{
        newItem = { ...item}
      }
      console.log(`Adding new item to ${type}:`, newItem);
      const currentItems = get()[type] as any[];
      const items = [...currentItems, newItem];
      set({ [type]: items, loading: false });
    } catch (error) {
      set({ error: `Failed to add ${type}`, loading: false });
    }
  },

  updateItem: async (type, id, item) => {
    set({ loading: true, error: null });
    try {
      await simulateDelay();
      const currentItems = get()[type] as any[];
      const items = currentItems.map((i: any) => i.id === id ? { ...i, ...item } : i);
      set({ [type]: items, loading: false });
    } catch (error) {
      set({ error: `Failed to update ${type}`, loading: false });
    }
  },

  deleteItem: async (type, id) => {
    set({ loading: true, error: null });
    try {
      await simulateDelay();
      const currentItems = get()[type] as any[];
      const items = currentItems.filter((i: any) => i.id !== id);
      set({ [type]: items, loading: false });
    } catch (error) {
      set({ error: `Failed to delete ${type}`, loading: false });
    }
  },

  reorderItems: async (type, items) => {
    set({ loading: true, error: null });
    try {
      await simulateDelay();
      set({ [type]: items, loading: false });
    } catch (error) {
      set({ error: `Failed to reorder ${type}`, loading: false });
    }
  }
}));