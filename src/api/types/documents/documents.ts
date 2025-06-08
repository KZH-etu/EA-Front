import { DocumentVersion } from "../document-versions/document-versions";
import { Tag } from "../tags/tags";

// SERMONS

export interface SermonMetadata {
    id: string;         // same as Document.id
    preacher: string;
    preachedAt: Date;
    location?: string;
}

// EVENTS

export enum EventType {
    CONVENTION = 'CONVENTION',
    PRAYER = 'PRAYER',
    SEMINAR = 'SEMINAR'
};

export interface EventMetadata {
    id: string;         // same as Document.id
    type: EventType;
    startTime: Date;
    endTime?: Date;
    location?: string;
}

// BOOKS

export interface BookMetadata {
    id: string;           // → equals parent Document.id
    author: string;
    publisher?: string;
    publishedAt?: Date;
    isbn?: string;
    pageCount?: number;
}

// DOCUMENTS

export enum DocumentCategory {
  BOOK   = 'BOOK',
  SERMON = 'SERMON',
  EVENT  = 'EVENT',
}

export interface Document {
    id: string;
    globalTitle: string;
    createdAt: Date;
    updatedAt: Date;

    //can choose to 'include' these fields in return statements
    categories?: DocumentCategory[]
    versions?: DocumentVersion[]
    bookMeta?: BookMetadata
    sermonMeta?: SermonMetadata
    eventMeta?: EventMetadata

    tags?: Tag[];
}