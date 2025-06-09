import { create } from "zustand";
import { CreateTagDto, UpdateTagDto } from "../api/types/tags/create-tag.dto";
import { Tag } from "../api/types/tags/tags";
import * as API from "../api/tags"

interface TagState {
  items: Tag[];
  loading: boolean;
  error?: string;
  hasFetched: boolean;

  fetchAll: (lang?: string) => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateTagDto) => Promise<void>;
  update: (id: string, dto: UpdateTagDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useTagStore = create<TagState>((set, get) => ({
  items: [],
  loading: false,
  error: undefined,
  hasFetched: false,

  fetchAll: async (lang) => {
    const { hasFetched } = get();
    if (hasFetched) return;
    set({ loading: true, error: undefined });
    try {
      const res = await API.fetchTags(lang);
      set({ items: res.data, hasFetched: true });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.fetchTag(id);
      set({ items: [res.data] });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  create: async (dto) => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.createTag(dto);
      set((state) => ({ items: [res.data, ...state.items] }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, dto) => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.updateTag(id, dto);
      set((state) => ({ items: state.items.map(t => t.id === id ? res.data : t) }));
      console.log('Tag mis à jour:', res.data);
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: undefined });
    try {
      await API.deleteTag(id);
      set((state) => ({ items: state.items.filter(t => t.id !== id) }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
