import { useState, useCallback } from 'react';
import { useDataStore } from '../services/dataService';
import { Sermon } from './useSermonsStore';
import { Books } from './useBooksStore';
import { Event } from './useEventsStore';
import { Tags } from './useTagsStore';

interface AdminStore {
  sermons: Sermon[];
  books: Books[];
  events: Event[];
  tags: Tags[];
  subscribers: any[];
  stats: any;
  aboutSections: any[];
  aboutDetails: any[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  addItem: (type: "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", item: any) => Promise<void>;
  updateItem: (type: "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", id: string, item: any) => Promise<void>;
  deleteItem: (type: "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", id: string) => Promise<void>;
  reorderItems: (type: "sermons" | "books" | "events" | "tags" | "subscribers" | "stats" | "aboutSections" | "aboutDetails", items: any[]) => Promise<void>;
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