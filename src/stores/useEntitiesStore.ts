import { useState, useCallback } from 'react';
import { useEntitiesData, useSermonsData } from '../hooks/useData';

type EventType = 'CONFERENCE' | 'SEMINAR' | 'MEETING';

export interface Entity {
  id: string;
  globalTitle: string;
  categories?: string[];
  tagIds: string[];
  bookMetadata?: {
    id: string;
    author: string;
    plublishAt?: Date;
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
  const { entities, loading, error, addItem, updateItem, deleteItem } = useEntitiesData();
  const [state, setState] = useState<EntitiesState>({
    entities: [],
    loading: false,
    error: null,
    fetchEntities: async () => {},
    addEntity: async () => {},
    updateEntity: async () => {},
    deleteEntity: async () => {}
  });

  const fetchEntities = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, entities, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch entities', loading: false }));
    }
  }, [entities]);

  const addEntity = useCallback(async (entity: Entity) => {
    await addItem('entities', entity);
    fetchEntities();
  }, [addItem, fetchEntities]);

  const updateEntity = useCallback(async (id: string, entity: Partial<Entity>) => {
    await updateItem('entities', id, entity);
    fetchEntities();
  }, [updateItem, fetchEntities]);

  const deleteEntity = useCallback(async (id: string) => {
    await deleteItem('entities', id);
    fetchEntities();
  }, [deleteItem, fetchEntities]);

  return {
    entities,
    loading,
    error,
    fetchEntities,
    addEntity,
    updateEntity,
    deleteEntity
  };
};