import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useTagStore } from '../../stores/useTagStore';
import { Tag } from '../../api/types/tags/tags';
import { CreateTagTranslationDto, LanguageEnum } from '../../api/types/tags/create-tag.dto';

const TagsPage = () => {
  const { 
    items: tags, 
    loading: loadingTags, 
    error: errorTags, 
    hasFetched,
    fetchAll: fetchTags,
    create: addTag, 
    update: updateTag, 
    remove: deleteTag 
  } = useTagStore();

  useEffect(() => {
    if(!hasFetched) fetchTags();
  }, [hasFetched, fetchTags]);
  
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newTagTranslations, setNewTagTranslations] = useState<CreateTagTranslationDto[]>([
    { language: LanguageEnum.fr, title: '' },
    { language: LanguageEnum.en, title: '' },
    { language: LanguageEnum.es, title: '' },
  ]);
    const [editTagTranslations, setEditTagTranslations] = useState<CreateTagTranslationDto[]>([
    { language: LanguageEnum.fr, title: '' },
    { language: LanguageEnum.en, title: '' },
    { language: LanguageEnum.es, title: '' },
  ]);
  const [editSelectedLang, setEditSelectedLang] = useState('fr');

  const handleDeleteTag = async (id : string) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;

    try {
      await deleteTag(id);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  if (loadingTags) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Tags</h1>
      </div>

      {errorTags && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {errorTags}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (newTagTranslations.every(t => !t.title.trim())) return;
            setSubmitting(true);
            try {
              console.log('creer un nouveau tag', newTagTranslations.map(t => ({ language: t.language, title: t.title.trim() })));
              await addTag({
                translations: newTagTranslations.map(t => ({ language: t.language, title: t.title.charAt(0).toUpperCase().trim() }))
              });
              setNewTagTranslations([
                { language: LanguageEnum.fr, title: '' },
                { language: LanguageEnum.en, title: '' },
                { language: LanguageEnum.es, title: '' },
              ]);
            } catch (error) {
              console.error('Failed to add tag:', error);
            } finally {
              setSubmitting(false);
            }
          }}
          className="flex flex-col md:flex-row gap-4 mb-8 items-center"
        >
          <div className="flex flex-col md:flex-row gap-2 w-full">
            {['fr', 'en', 'es'].map((lang) => (
              <input
                key={lang}
                type="text"
                value={newTagTranslations.find(t => t.language === lang)?.title || ''}
                onChange={e => {
                  setNewTagTranslations(newTagTranslations.map(t =>
                    t.language === lang ? { ...t, title: e.target.value } : t
                  ));
                }}
                placeholder={`Tag (${lang.toUpperCase()})`}
                className="form-input flex-1"
                disabled={submitting}
              />
            ))}
          </div>
          <button
            type="submit"
            className="btn-primary flex items-center"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Ajout...
              </>
            ) : (
              <>
                <Plus size={20} className="mr-2" />
                Ajouter
              </>
            )}
          </button>
        </form>

        <div className="space-y-4">
          {tags.map((tag) => {
            return(
            <div
              key={tag.id}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
            >
              {editingTag?.id === tag.id ? (
                <div className="flex gap-2 items-center flex-grow">
                  <div className="flex flex-col flex-grow">
                    <div className="flex gap-1 mb-1">
                      {['fr', 'en', 'es'].map(lang => (
                        <button
                          type="button"
                          key={lang}
                          className={`px-2 py-1 rounded ${editSelectedLang === lang ? 'bg-primary-500 text-white' : 'bg-neutral-200'}`}
                          onClick={() => setEditSelectedLang(lang)}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={editTagTranslations.find(t => t.language === editSelectedLang)?.title || ''}
                      onChange={e => {
                        setEditTagTranslations(editTagTranslations.map(t =>
                          t.language === editSelectedLang ? { ...t, title: e.target.value } : t
                        ));
                      }}
                      className="form-input flex-grow"
                      autoFocus
                      disabled={submitting}
                    />
                  </div>
                </div>
              ) : (
                <span>{tag.translations.find(t => t.language == 'fr')?.title}</span>
              )}

              <div className="flex items-center space-x-2">
                {editingTag?.id === tag.id ? (
                  <>
                    <button
                      onClick={async () => {
                        setSubmitting(true);
                        try {
                          await updateTag(tag.id, {
                            translations: editTagTranslations.map(t => ({ language: t.language, title: t.title.trim() })),
                          });
                          fetchTags();
                          setEditingTag(null);
                        } catch (error) {
                          console.error('Failed to update tag:', error);
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                      className="p-2 text-primary-600 hover:text-primary-800 disabled:opacity-50"
                      disabled={submitting}
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={() => setEditingTag(null)}
                      className="p-2 text-neutral-500 hover:text-neutral-700"
                      disabled={submitting}
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingTag(tag);
                        setEditTagTranslations([
                          { language: LanguageEnum.fr, title: tag.translations.find(t => t.language === LanguageEnum.fr)?.title || '' },
                          { language: LanguageEnum.en, title: tag.translations.find(t => t.language === LanguageEnum.en)?.title || '' },
                          { language: LanguageEnum.es, title: tag.translations.find(t => t.language === LanguageEnum.es)?.title || '' },
                        ]);
                        setEditSelectedLang('fr');
                      }}
                      className="p-2 text-primary-600 hover:text-primary-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="p-2 text-error hover:text-error/80"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;