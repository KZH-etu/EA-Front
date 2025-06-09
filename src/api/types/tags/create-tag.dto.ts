export enum LanguageEnum {
  en = 'en',
  fr = 'fr',
  es = 'es',
}

export interface CreateTagTranslationDto {
    language: LanguageEnum;
    title: string;
}

export interface CreateTagDto {
    translations: CreateTagTranslationDto[];
}

export interface UpdateTagDto {
    translations?: CreateTagTranslationDto[];
}