import { MediaSupport } from '../stores/useMediaSupportStore';
import api from './apiService';

export async function fetchDocumentMedias() {
  const res = await api.get('/document-media');
  return res.data;
}

export async function createDocumentMedias(document: MediaSupport) {
  const res = await api.post('/document-media', document);
  return res.data;
}

export async function updateDocumentMedias(id: string, updates: Partial<MediaSupport>) {
  const res = await api.patch(`/document-media/${id}`, updates);
  return res.data;
}

export async function deleteDocumentMedias(id: string) {
  const res = await api.delete(`/document-media/${id}`);
  return res.data;
}