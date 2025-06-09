import { create } from "zustand";
import { Document } from "../api/types/documents/documents";
import { CreateDocumentDto, UpdateDocumentDto } from "../api/types/documents/create-document.dto";
import * as API from "../api/documents"


interface DocumentState {
  items: Document[];
  current?: Document;
  loading: boolean;
  error?: string;
  hasFetched: boolean;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateDocumentDto) => Promise<void>;
  update: (id: string, dto: UpdateDocumentDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
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
      const res = await API.fetchDocuments();
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
      const res = await API.fetchDocument(id);
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
      const res = await API.createDocument(dto);
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
      const res = await API.updateDocument(id, dto);
      set((state) => ({
        items: state.items.map((d) => (d.id === id ? res.data : d)),
        current: state.current?.id === id ? res.data : state.current,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: undefined });
    try {
      await API.deleteDocument(id);
      set((state) => ({
        items: state.items.filter((d) => d.id !== id),
        current: state.current?.id === id ? undefined : state.current,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));