import { create } from "zustand";
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "../api/types/document-media/create-document-media.dto";
import { DocumentMedia } from "../api/types/document-media/document-media";
import * as API from "../api/media"

interface MediaState {
  items: DocumentMedia[];
  current?: DocumentMedia;
  loading: boolean;
  error?: string;
  hasFetched?: boolean;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateDocumentMediaDto) => Promise<void>;
  update: (id: string, dto: UpdateDocumentMediaDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useMediaStore = create<MediaState>((set, get) => ({
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
      const res = await API.fetchMedia();
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
      const res = await API.fetchMediaItem(id);
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
      const res = await API.createMedia(dto);
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
      const res = await API.updateMedia(id, dto);
      set((state) => ({
        items: state.items.map((m) => (m.id === id ? res.data : m)),
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
      await API.deleteMedia(id);
      set((state) => ({
        items: state.items.filter((m) => m.id !== id),
        current: state.current?.id === id ? undefined : state.current,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
