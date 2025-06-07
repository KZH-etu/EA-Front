export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}


export interface DocumentMedia {
    id: string;
    documentVersionId: string;  // id to link back to the document-version
    mediaType: MediaType;
    url: string;     //url to the actual document
    title?: string;
    createdAt: Date;
    updatedAt: Date;
}
