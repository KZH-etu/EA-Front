import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag?: string;
}

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lang: string) => void;
  availableLanguages: string[];
  currentLanguage?: string;
}

const LANGUAGES: Record<string, Language> = {
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
};

const LanguageSelector = ({ isOpen, onClose, onSelect, availableLanguages, currentLanguage }: LanguageSelectorProps) => {
  if (!isOpen) return null;

  const handleLanguageSelect = (langCode: string) => {
    onSelect(langCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Globe size={24} className="mr-2 text-primary-500" />
            Sélectionner une langue
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            &times;
          </button>
        </div>

        <div className="space-y-2">
          {availableLanguages.map(langCode => {
            const lang = LANGUAGES[langCode];
            if (!lang) return null;

            return (
              <button
                key={langCode}
                onClick={() => handleLanguageSelect(langCode)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  currentLanguage === langCode
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-neutral-50'
                }`}
              >
                <span className="text-2xl mr-3">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {currentLanguage === langCode && (
                  <span className="ml-auto text-primary-500">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;