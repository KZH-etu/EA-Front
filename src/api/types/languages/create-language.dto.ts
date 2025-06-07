import { LanguageType } from "./languages";

export interface CreateLanguageDto {
    id: string;
    name: string;   
    type: LanguageType;
    countryOfOrigin?: string;
}

export interface UpdateLanguageDto {
    name?: string;
    type?: LanguageType;
    countryOfOrigin?: string;
}