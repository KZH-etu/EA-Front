import { MediaVersion } from '../stores/useMediaVersionStore';
import api from './apiService';

export async function fetchDocumentVersions() {
  const res = await api.get('/document-versions');
  return res.data;
}

export async function createDocumentVersion(document: MediaVersion) {
  const res = await api.post('/document-versions', document);
  return res.data;
}

export async function updateDocumentVersion(id: string, updates: Partial<MediaVersion>) {
  const res = await api.patch(`/document-versions/${id}`, updates);
  return res.data;
}

export async function deleteDocumentVersion(id: string) {
  const res = await api.delete(`/document-versions/${id}`);
  return res.data;
}