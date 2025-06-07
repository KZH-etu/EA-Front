import { useDataStore } from '../services/dataService';

type EventType = 'CONFERENCE' | 'SEMINAR' | 'MEETING';

export interface Entity {
  id: string;
  globalTitle: string;
  categories?: string[];
  tagIds: string[];
  bookMetadata?: {
    id: string;
    author: string;
    publishAt?: Date;
  };
  sermonMetadata?: {
    id: string;
    preacher: string;
    preachedAt: Date;
    location?: string;
  };
  eventMetadata?: {
    id: string;
    type: EventType;
    startTime: Date;
    endTime?: Date;
    location?: string;
  };
}

interface EntitiesState {
  entities: Entity[];
  loading: boolean;
  error: string | null;
  fetchEntities: () => Promise<void>;
  addEntity: (entity: Entity) => Promise<void>;
  updateEntity: (id: string, entity: Partial<Entity>) => Promise<void>;
  deleteEntity: (id: string) => Promise<void>;
}

export const useEntitiesStore = (): EntitiesState => {
  const {
    entities,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  } = useDataStore(state => ({
    entities: state.entities,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
    addItem: state.addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
  }));

  console.log('Entities Store:', {
    entities,});

  return {
    entities,
    loading,
    error,
    fetchEntities: fetchData,
    addEntity: (entity) => addItem('entities', entity),
    updateEntity: (id, entity) => updateItem('entities', id, entity),
    deleteEntity: (id) => deleteItem('entities', id),
  };
};