import { Language } from '../stores/useLanguagesStore';
import api from './apiService';

export async function fetchLanguages() : Promise<Language[]> {
  const res = await api.get('/languages');
  return res.data;
}

export async function createLanguage(language: Language) : Promise<Language> {
  const res = await api.post('/languages', language);
  return res.data;
}

export async function updateLanguage(id: string, updates: Partial<Language>) {
  console.log('Updating language with ID:', id, 'Updates:', updates);
  const res = await api.patch(`/languages/${id}`, updates);
  return res.data;
}

export async function deleteLanguage(id: string)  {
  const res = await api.delete(`/languages/${id}`);
  return res.data;
}