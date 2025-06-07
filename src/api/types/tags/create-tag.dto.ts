enum Language {
  en = 'en',
  fr = 'fr',
  es = 'es',
}

export interface CreateTagTranslationDto {
    language: Language;
    title: string;
}

export interface CreateTagDto {
    translations: CreateTagTranslationDto[];
}

export interface UpdateTagDto {
    translations?: CreateTagTranslationDto[];
}