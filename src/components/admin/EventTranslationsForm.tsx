import { useState } from 'react';

const LANGUAGES = [
  { lang: 'fr', name: 'Français', flag: '🇫🇷' },
  { lang: 'en', name: 'English', flag: '🇬🇧' },
  { lang: 'es', name: 'Español', flag: '🇪🇸' },
];

interface Translation {
  lang: string;
  title: string;
  description: string;
  is_auto_translated: boolean;
}

interface Props {
  translations: Translation[];
  onChange: (translations: Translation[]) => void;
}

const EventTranslationsForm = ({ translations, onChange }: Props) => {
  const handleChange = (lang: string, field: 'title' | 'description', value: string) => {
    const updated = translations.map(t =>
      t.lang === lang ? { ...t, [field]: value } : t
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {LANGUAGES.map(({ lang, name, flag }) => {
        const t = translations.find(tr => tr.lang === lang) || { lang, title: '', description: '' };
        return (
          <div key={lang} className="border rounded-lg p-4 bg-neutral-50">
            <div className="mb-2 font-medium flex items-center gap-2">
              <span>{flag}</span>
              <span>{name}</span>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                className="form-input w-full"
                value={t.title}
                onChange={e => handleChange(lang, 'title', e.target.value)}
                required={lang === 'fr'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="form-input w-full"
                rows={3}
                value={t.description}
                onChange={e => handleChange(lang, 'description', e.target.value)}
                required={lang === 'fr'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventTranslationsForm;