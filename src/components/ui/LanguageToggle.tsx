import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore, SUPPORTED_LANGUAGES } from '../../stores/useLanguageStore';

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <Globe size={20} className="text-neutral-600" />
        <span className="text-sm font-medium">
          {SUPPORTED_LANGUAGES[currentLanguage]?.flag}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
          {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-neutral-50 ${
                currentLanguage === lang.code ? 'text-primary-600 bg-primary-50' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;