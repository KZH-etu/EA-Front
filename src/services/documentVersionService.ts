import { MediaVersion } from '../stores/useMediaVersionStrore';
import api from './apiService';

export async function fetchDocumentVersions() {
  const res = await api.get('/document-versions');
  return res.data;
}

export async function createDocumentVersions(document: MediaVersion) {
  const res = await api.post('/document-versions', document);
  return res.data;
}

export async function updateDocumentVersions(id: string, updates: Partial<MediaVersion>) {
  const res = await api.patch(`/document-versions/${id}`, updates);
  return res.data;
}

export async function deleteDocumentVersions(id: string) {
  const res = await api.delete(`/document-versions/${id}`);
  return res.data;
}