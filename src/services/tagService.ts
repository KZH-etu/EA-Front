import { Tags } from '../stores/useTagsStore';
import api from './apiService';

export async function fetchTags() {
  const res = await api.get('/tags');
  return res.data;
}

export async function createTag(document: Tags) {
  const res = await api.post('/tags', document);
  return res.data;
}

export async function updateTag(id: string, updates: Partial<Tags>) {
  const res = await api.patch(`/tags/${id}`, updates);
  return res.data;
}

export async function deleteTag(id: string) {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
}