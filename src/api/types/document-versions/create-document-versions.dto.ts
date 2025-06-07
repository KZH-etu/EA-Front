export interface CreateDocumentVersionDto {
    documentId: string;
    languageId: string;   
    title: string;
    description?: string;
    publishedAt?: Date;
}

export interface UpdateDocumentVersionDto {
    languageId?: string;
    title?: string;
    description?: string;
    publishedAt?: Date;
}