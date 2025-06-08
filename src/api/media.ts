import api from "./client";
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "./types/document-media/create-document-media.dto";
import { DocumentMedia } from "./types/document-media/document-media";

export const fetchMedia = () => api.get<DocumentMedia[]>('/document-media');
export const fetchMediaItem = (id: string) => api.get<DocumentMedia>(`/document-media/${id}`);
export const createMedia = (body: CreateDocumentMediaDto) => api.post<DocumentMedia>('/document-media', body);
export const updateMedia = (id: string, body: UpdateDocumentMediaDto) => api.patch<DocumentMedia>(`/document-media/${id}`, body);
export const deleteMedia = (id: string) => api.delete(`/document-media/${id}`);