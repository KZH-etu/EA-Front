import { Entity } from '../stores/useEntitiesStore';
import api from './apiService';

export async function fetchDocuments() : Promise<Entity[]> {
  const res = await api.get('/documents');
  return res.data;
}

export async function createDocument(document: Entity) : Promise<Entity> {
  const res = await api.post('/documents', document);
  return res.data;
}

export async function updateDocument(id: string, updates: Partial<Entity>) {
  console.log('Updating document with ID:', id, 'Updates:', updates);
  const res = await api.patch(`/documents/${id}`, updates);
  return res.data;
}

export async function deleteDocument(id: string)  {
  const res = await api.delete(`/documents/${id}`);
  return res.data;
}