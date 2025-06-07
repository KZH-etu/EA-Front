import { DocumentCategory, EventType } from "./documents";

export interface CreateBookMetadataDto {
    author: string;
    publisher?: string;
    publishedAt?: Date;
    isbn?: string;
    pageCount?: number;
}

export interface CreateSermonMetadataDto {
    preacher: string;
    preachedAt: Date;
    location?: string;
}

export interface CreateEventMetadataDto {
    type: EventType;
    startTime: Date;
    endTime?: Date;
    location?: string;
}

export interface CreateDocumentDto {
    globalTitle: string;
    categories?: DocumentCategory[];
    tagIds?: string[];
    bookMeta?: CreateBookMetadataDto;
    sermonMeta?: CreateSermonMetadataDto;
    eventMeta?: CreateEventMetadataDto;
}

export interface UpdateDocumentDto {
    globalTitle?: string;
    categories?: DocumentCategory[];
    tagIds?: string[];
    bookMeta?: CreateBookMetadataDto;
    sermonMeta?: CreateSermonMetadataDto;
    eventMeta?: CreateEventMetadataDto;
}