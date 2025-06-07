import { Tags } from '../stores/useTagsStore';
import api from './apiService';

export async function fetchDocumentMedias() {
  const res = await api.get('/tags');
  return res.data;
}

export async function createDocumentMedias(document: Tags) {
  const res = await api.post('/tags', document);
  return res.data;
}

export async function updateDocumentMedias(id: string, updates: Partial<Tags>) {
  const res = await api.patch(`/tags/${id}`, updates);
  return res.data;
}

export async function deleteDocumentMedias(id: string) {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
}