import { useState, useCallback } from 'react';
import { useEventsData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';

export interface Event {
  id: string;
  date: string;
  language: string;
  location: string;
  translations: ContentTranslations[];
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
}

export const useEventsStore = (): EventsState => {
  const { events, loading, error } = useEventsData();
  const [state, setState] = useState<EventsState>({
    events: [],
    loading: false,
    error: null,
    fetchEvents: async () => {}
  });

  const fetchEvents = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, events, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch events', loading: false }));
    }
  }, [events]);

  return {
    events,
    loading,
    error,
    fetchEvents
  };
};