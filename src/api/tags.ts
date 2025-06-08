import api from "./client";
import { CreateTagDto, UpdateTagDto } from "./types/tags/create-tag.dto";
import { Tag } from "./types/tags/tags";

export const fetchTags = (lang?: string) => api.get<Tag[]>(`/tags${lang ? `?lang=${lang}` : ''}`);
export const fetchTag = (id: string) => api.get<Tag>(`/tags/${id}`);
export const createTag = (body: CreateTagDto) => api.post<Tag>('/tags', body);
export const updateTag = (id: string, body: UpdateTagDto) => api.patch<Tag>(`/tags/${id}`, body);
export const deleteTag = (id: string) => api.delete(`/tags/${id}`);