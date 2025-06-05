export interface ContentTranslations {
  lang: string;
  title: string;
  description?: string | string[];
  downloadUrl?: string;
  audioUrl?: string;
  readUrl?: string;
  is_auto_translated: boolean;
}