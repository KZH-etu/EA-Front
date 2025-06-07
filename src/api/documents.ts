import api from './client';
import { CreateDocumentDto, UpdateDocumentDto } from './types/documents/create-document.dto';
import { Document } from './types/documents/documents';

export const fetchDocuments = () => api.get<Document[]>('/documents');
export const fetchDocument = (id: string) => api.get<Document>(`/documents/${id}`);
export const createDocument = (body: CreateDocumentDto) => api.post<Document>('/documents', body);
export const updateDocument = (id: string, body: UpdateDocumentDto) =>
  api.patch<Document>(`/documents/${id}`, body);
export const deleteDocument = (id: string) => api.delete(`/documents/${id}`);
