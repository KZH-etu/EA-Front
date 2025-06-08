import api from "./client";
import { CreateLanguageDto, UpdateLanguageDto } from "./types/languages/create-language.dto";
import { Language } from "./types/languages/languages";

export const fetchLanguages = () => api.get<Language[]>('/languages');
export const fetchLanguage = (id: string) => api.get<Language>(`/languages/${id}`);
export const createLanguage = (body: CreateLanguageDto) => api.post<Language>('/languages', body);
export const updateLanguage = (id: string, body: UpdateLanguageDto) => api.patch<Language>(`/languages/${id}`, body);
export const deleteLanguage = (id: string) => api.delete(`/languages/${id}`);