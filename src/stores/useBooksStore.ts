import { useState, useCallback, useEffect } from 'react';
import { useBooksData } from '../hooks/useData';
import { ContentTranslations } from '../lib/interfacesData';
import { useDataStore } from '../services/dataService';

export interface Books {
  id: string;
  author: string;
  category: string;
  year: number;
  coverUrl?: string;
  tags: string[];
  availableLanguages: string[];
  language: string;
  translations: ContentTranslations[];
}

interface BooksState {
  books: Books[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}

export const useBooksStore = (): BooksState => {
  const { books, loading, error, fetchData } = useDataStore(state => ({
    books: state.books,
    loading: state.loading,
    error: state.error,
    fetchData: state.fetchData,
  }));

  return {
    books,
    loading,
    error,
    fetchBooks: fetchData,
  };
};