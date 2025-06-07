import { useDataStore } from '../services/dataService';
import { Sermon } from './useSermonsStore';
import { Books } from './useBooksStore';
import { Event } from './useEventsStore';
import { Tags } from './useTagsStore';
import { Entity } from './useEntitiesStore';
import { MediaVersion } from './useMediaVersionStore';
import { MediaSupport } from './useMediaSupportStore';
import { Language } from './useLanguagesStore';

interface AdminStore {
  mediaSupports: MediaSupport[];
  mediaVersions: MediaVersion[];
  entities: Entity[];
  sermons: Sermon[];
  books: Books[];
  events: Event[];
  languages: Language[];
  tags: Tags[];
  subscribers: any[];
  stats: any;
  aboutSections: any[];
  aboutDetails: any[];
  loading: boolean;
  hasFetched: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  addItem: (type: "languages" | "mediaSupports" | "mediaVersions" | "entities" | "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", item: any) => Promise<void>;
  updateItem: (type: "languages" | "mediaSupports" | "mediaVersions" | "entities" | "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", id: string, item: any) => Promise<void>;
  deleteItem: (type: "languages" | "mediaSupports" | "mediaVersions" | "entities" | "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", id: string) => Promise<void>;
  reorderItems: (type: "languages" | "mediaSupports" | "mediaVersions" | "entities" | "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", items: any[]) => Promise<void>;
}

export const useAdminStore = (): AdminStore => {
  const store = useDataStore();
  const { fetchData, addItem, updateItem, deleteItem, reorderItems } = store;

  return {
    ...store,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
    reorderItems
  };
};