import { useState, useCallback, useEffect } from 'react';
import { useBooksData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';

export interface Books {
  id: string;
  author: string;
  category: string;
  year: number;
  coverUrl: string;
  tags: string[];
  availableLanguages: string[];
  language: string;
  location?: string;
  translations: ContentTranslations[];
}

interface BooksState {
  books: Books[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}

export const useBooksStore = (): BooksState => {
  const { books, loading, error } = useBooksData();
  const [state, setState] = useState<BooksState>({
    books: [],
    loading: false,
    error: null,
    fetchBooks: async () => {}
  });

  const fetchBooks = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      setState(prev => ({ ...prev, books, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to fetch books', loading: false }));
    }
  }, [books]);

  return {
    books,
    loading,
    error,
    fetchBooks
  };
};