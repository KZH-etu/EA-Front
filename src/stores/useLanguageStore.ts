import { create } from "zustand";
import { CreateLanguageDto, UpdateLanguageDto } from "../api/types/languages/create-language.dto";
import { Language } from "../api/types/languages/languages";
import * as API from "../api/languages"

interface LanguageState {
  items: Language[];
  current?: Language;
  loading: boolean;
  error?: string;
  hasFetched?: boolean;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateLanguageDto) => Promise<void>;
  update: (id: string, dto: UpdateLanguageDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  items: [],
  current: undefined,
  loading: false,
  error: undefined,
  hasFetched: false,

  fetchAll: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;

    set({ loading: true, error: undefined });
    try {
      const res = await API.fetchLanguages();
      set({ items: res.data });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.fetchLanguage(id);
      set({ current: res.data });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  create: async (dto) => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.createLanguage(dto);
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
      const res = await API.updateLanguage(id, dto);
      set((state) => ({ items: state.items.map(l => l.id === id ? res.data : l), current: state.current?.id === id ? res.data : state.current }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: undefined });
    try {
      await API.deleteLanguage(id);
      set((state) => ({ items: state.items.filter(l => l.id !== id), current: state.current?.id === id ? undefined : state.current }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
