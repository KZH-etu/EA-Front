import { useState } from 'react';
import { FileText, Globe, Plus, Trash2 } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface LanguageContent {
  code: string;
  audioUrl?: string;
  downloadUrl?: string;
  readUrl?: string;
}

interface LanguageContentFormProps {
  availableLanguages: string[];
  languageContent: Record<string, LanguageContent>;
  onChange: (content: Record<string, LanguageContent>) => void;
  register: UseFormRegister<{
    type?: string;
    tags?: never[];
    description?: string;
    preacher?: string;
    language?: string;
    title?: string;
    date?: string;
    mediaUrl?: string;
    location?: string;
}>;
  errors: FieldErrors<{
    type: string;
    tags: never[];
    preacher: string;
    language: string;
    description: string;
    title: string;
    date: string;
    mediaUrl: string;
    location: string;
}>;
  type: 'sermon' | 'book';
}

const LANGUAGES = [
  {lang: 'fr', name: 'Français', flag: '🇫🇷' },
  {lang: 'en', name: 'English', flag: '🇬🇧' },
  {lang: 'es', name: 'Español', flag: '🇪🇸' },
  {lang: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const LanguageContentForm = ({ availableLanguages, languageContent, onChange, type, register, errors }: LanguageContentFormProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleAddLanguage = (langCode: string) => {
    const newContent = {
      ...languageContent,
      [langCode]: {
        code: langCode,
        audioUrl: '',
        downloadUrl: '',
        readUrl: ''
      }
    };
    onChange(newContent);
    setSelectedLanguage(null);
  };

  const handleRemoveLanguage = (langCode: string) => {
    const newContent = { ...languageContent };
    delete newContent[langCode];
    onChange(newContent);
  };

  const handleUrlChange = (langCode: string, urlType: 'audioUrl' | 'downloadUrl' | 'readUrl', value: string) => {
    const newContent = {
      ...languageContent,
      [langCode]: {
        ...languageContent[langCode],
        [urlType]: value
      }
    };
    onChange(newContent);
  };

  const availableLangOptions = Object.entries(LANGUAGES)
    .filter(([code]) => !languageContent[code]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-900">Contenu par langue</h3>
        {availableLangOptions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setSelectedLanguage(selectedLanguage ? null : 'select')}
              className="btn-outline text-sm"
            >
              <Plus size={16} className="mr-2" />
              Ajouter une langue
            </button>
            
            {selectedLanguage === 'select' && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-neutral-200">
                {availableLangOptions.map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleAddLanguage(code)}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(languageContent).map(([langCode, content]) => (
          <div key={langCode} className="border rounded-lg p-4 bg-neutral-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe size={20} className="text-primary-500 mr-2" />
                <span className="mr-2">{LANGUAGES.find(t => t.lang === langCode)?.flag}</span>
                <span className="font-medium">{LANGUAGES.find(t => t.lang === langCode)?.name}</span>
              </div>
              <button
                onClick={() => handleRemoveLanguage(langCode)}
                className="text-error hover:text-error/80 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Titre
                </label>
                <div className="relative">
                  <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    id="title"
                    className="pl-10 w-full form-input"
                    {...register('title', { required: 'Le titre est requis' })}
                  />
                </div>
                {errors.title && (
                  <p className="mt-1 text-sm text-error">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Description
                </label>
                <div className="relative">
                  <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <textarea
                    id="description"
                    rows={3}
                    className="pl-10 w-full form-input"
                    {...register('description', { required: 'La description est requise' })}
                  />
                </div>
                {errors.description && (
                  <p className="mt-1 text-sm text-error">{errors.description.message}</p>
                )}
              </div>

              {type === 'sermon' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    URL Audio
                  </label>
                  <input
                    type="url"
                    value={content.audioUrl || ''}
                    onChange={(e) => handleUrlChange(langCode, 'audioUrl', e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    className="form-input w-full"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  URL de téléchargement
                </label>
                <input
                  type="url"
                  value={content.downloadUrl || ''}
                  onChange={(e) => handleUrlChange(langCode, 'downloadUrl', e.target.value)}
                  placeholder="https://example.com/download.pdf"
                  className="form-input w-full"
                />
              </div>

              {type === 'book' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    URL de lecture en ligne
                  </label>
                  <input
                    type="url"
                    value={content.readUrl || ''}
                    onChange={(e) => handleUrlChange(langCode, 'readUrl', e.target.value)}
                    placeholder="https://example.com/read"
                    className="form-input w-full"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageContentForm;