import api from "./client";
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "./types/document-versions/create-document-versions.dto";
import { DocumentVersion } from "./types/document-versions/document-versions";

export const fetchVersions = () => api.get<DocumentVersion[]>('/document-versions');
export const fetchVersion = (id: string) => api.get<DocumentVersion>(`/document-versions/${id}`);
export const createVersion = (body: CreateDocumentVersionDto) => api.post<DocumentVersion>('/document-versions', body);
export const updateVersion = (id: string, body: UpdateDocumentVersionDto) => api.patch<DocumentVersion>(`/document-versions/${id}`, body);
export const deleteVersion = (id: string) => api.delete(`/document-versions/${id}`);