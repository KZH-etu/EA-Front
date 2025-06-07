import { create } from "zustand";
import { CreateSubscriberDto, UpdateSubscriberDto } from "../api/types/subscribers/create-subscribers.dto";
import { Subscriber } from "../api/types/subscribers/subscribers";
import * as API from "../api/subscribers"

interface SubscriberState {
  items: Subscriber[];
  current?: Subscriber;
  loading: boolean;
  error?: string;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (dto: CreateSubscriberDto) => Promise<void>;
  update: (id: string, dto: UpdateSubscriberDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  items: [],
  current: undefined,
  loading: false,
  error: undefined,

  fetchAll: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await API.fetchSubscribers();
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
      const res = await API.fetchSubscriber(id);
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
      const res = await API.createSubscriber(dto);
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
      const res = await API.updateSubscriber(id, dto);
      set((state) => ({ items: state.items.map(s => s.id === id ? res.data : s), current: state.current?.id === id ? res.data : state.current }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: undefined });
    try {
      await API.deleteSubscriber(id);
      set((state) => ({ items: state.items.filter(s => s.id !== id), current: state.current?.id === id ? undefined : state.current }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));