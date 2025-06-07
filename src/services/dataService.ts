import { create } from 'zustand';
import {  mockAdminEvents, mockAdminTags, mockAdminSubscribers, mockAdminStats, mockAdminAboutSections, mockAdminAboutDetails, mockAdminLanguages } from '../lib/mockAdminData';
import { MediaSupport } from '../stores/useMediaSupportStore';
import { MediaVersion } from '../stores/useMediaVersionStore';
import { Entity } from '../stores/useEntitiesStore';
import { Sermon } from '../stores/useSermonsStore';
import { Books } from '../stores/useBooksStore';
import { Tags } from '../stores/useTagsStore';
import { Event } from '../stores/useEventsStore';
import { createDocument, deleteDocument, fetchDocuments, updateDocument } from './documentService';
import { createDocumentVersion, deleteDocumentVersion, fetchDocumentVersions, updateDocumentVersion } from './documentVersionService';
import { createDocumentMedia, deleteDocumentMedia, fetchDocumentMedias, updateDocumentMedia } from './documentMediaService';
import { mapBooks, mapSermons } from '../components/utils/formatters';
import { createTag, deleteTag, updateTag } from './tagService';

// Central store for all data
interface DataState {
  mediaSupports: MediaSupport[];
  mediaVersions: MediaVersion[];
  entities: Entity[];
  sermons: Sermon[];
  books: Books[];
  events: Event[];
  tags: Tags[];
  languages: typeof mockAdminLanguages;
  subscribers: typeof mockAdminSubscribers;
  stats: any;
  aboutSections: typeof mockAdminAboutSections;
  aboutDetails: typeof mockAdminAboutDetails;
  loading: boolean;
  hasFetched: boolean;
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

const initialState: DataState = {
  mediaSupports: [],
  mediaVersions: [],
  entities: [],
  sermons: [],
  books: [],
  events: [],
  tags: [],
  languages: [],
  subscribers: [],
  stats: mockAdminStats,
  aboutSections: [],
  aboutDetails: [],
  loading: false,
  hasFetched: false,
  error: null,
};

// Create the central data store
export const useDataStore = create<DataStore>((set, get) => ({
  // Initial state
  ...initialState,
  
  // Actions
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching data...');
      const [entities , mediaVersions, mediaSupports] = await Promise.all([
        fetchDocuments(),
        fetchDocumentVersions(),
        fetchDocumentMedias()
      ]);
      set({
        entities,
        mediaVersions,
        mediaSupports,
        events: mockAdminEvents,
        tags: mockAdminTags,
        languages: mockAdminLanguages,
        subscribers: mockAdminSubscribers,
        stats: mockAdminStats,
        books: mapBooks({entities, versions: mediaVersions, medias: mediaSupports}),
        sermons: mapSermons({entities, versions: mediaVersions, medias: mediaSupports}),
        loading: false,
        hasFetched: true,
      });
    } catch (error) {
      set({ error: 'Failed to fetch data', loading: false });
    }
  },

  addItem: async (type, item) => {
    set({ loading: true, error: null });
    try {
      switch (type) {
        case 'mediaSupports':
          await createDocumentMedia(item as MediaSupport);
          break;
        case 'mediaVersions':
          await createDocumentVersion(item as MediaVersion);
          break;
        case 'entities':
          await createDocument(item as Entity);
          break;
        case 'tags':
          await createTag(item as Tags);
          break;
      }
      await get().fetchData();
    } catch (error) {
      set({ error: `Failed to add ${type}`, loading: false });
    }
  },

  updateItem: async (type, id, item) => {
    set({ loading: true, error: null });
    try {
      switch (type) {
        case 'mediaSupports':
          await updateDocumentMedia(id, item as Partial<MediaSupport>);
          break;
        case 'mediaVersions':
          await updateDocumentVersion(id, item as Partial<MediaVersion>);
          break;
        case 'tags':
          await updateTag(id, item as Partial<Tags>);
          break;
          case 'entities':
          await updateDocument(id, item as Partial<Entity>);
          break;
      }
      // Ajoute ici les autres types si besoin
      await get().fetchData();
    } catch (error) {
      set({ error: `Failed to update ${type}`, loading: false });
    }
  },

  deleteItem: async (type, id) => {
    set({ loading: true, error: null });
    try {
      switch (type) {
        case 'mediaSupports':
          await deleteDocumentMedia(id);
          break;
        case 'mediaVersions':
          await deleteDocumentVersion(id);
          break;
        case 'tags':
          await deleteTag(id);
          break;
          case 'entities':
          await deleteDocument(id);
          break;
      }
      // Ajoute ici les autres types si besoin
      await get().fetchData();
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