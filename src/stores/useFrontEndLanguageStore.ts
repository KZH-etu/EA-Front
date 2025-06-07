import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const SUPPORTED_LANGUAGES: Record<string, Language> = {
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
};

interface LanguageState {
  currentLanguage: string;
  setLanguage: (code: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'fr',
      setLanguage: (code: string) => {
        if (SUPPORTED_LANGUAGES[code]) {
          set({ currentLanguage: code });
        }
      }
    }),
    {
      name: 'language-store'
    }
  )
);