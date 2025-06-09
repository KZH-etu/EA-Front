import { create } from "zustand";
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "../api/types/document-versions/create-document-versions.dto";
import { DocumentVersion } from "../api/types/document-versions/document-versions";
import * as API from "../api/versions"


interface VersionState {
  items: DocumentVersion[];
  current?: DocumentVersion;
  loading: boolean;
  error?: string;
  hasFetched?: boolean;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateDocumentVersionDto) => Promise<void>;
  update: (id: string, dto: UpdateDocumentVersionDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useVersionStore = create<VersionState>((set, get) => ({
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
      const res = await API.fetchVersions();
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
      const res = await API.fetchVersion(id);
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
      const res = await API.createVersion(dto);
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
      const res = await API.updateVersion(id, dto);
      set((state) => ({
        items: state.items.map((v) => (v.id === id ? res.data : v)),
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
      await API.deleteVersion(id);
      set((state) => ({
        items: state.items.filter((v) => v.id !== id),
        current: state.current?.id === id ? undefined : state.current,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
