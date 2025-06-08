import { DocumentMedia } from "../document-media/document-media";

export interface DocumentVersion {
    id: string;
    documentId: string;         // Foreign Key -> document
    languageId: string;          // Foreign Key -> language
    title: string;             // translated title
    description?: string;       // translated description
    publishedAt?: Date;

    mediaItems?: DocumentMedia[]
}