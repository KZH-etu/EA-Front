import { MediaType } from "./document-media";

export interface CreateDocumentMediaDto {
    documentVersionId: string;
    mediaType: MediaType;
    url: string;
    title?: string;
}

export interface UpdateDocumentMediaDto {
    documentVersionId?: string;
    mediaType?: MediaType;
    url?: string;
    title?: string;
}