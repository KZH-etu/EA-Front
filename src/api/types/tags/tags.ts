export interface Tag {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagTranslation {
  id: string;
  tagId: string;          // FK → Tag.id
  language: 'en' | 'fr' | 'es';
  title: string;          // e.g. “Blessing” / “Bénédiction” / “Bendición”
}