import { useState } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Tags } from '../../stores/useTagStore';

const TagsPage = () => {
  const { tags, loading, error, addItem, updateItem, deleteItem } = useAdminStore();
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<Tags | null>(null);
  const [editedName, setEditedName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [newTagTranslations, setNewTagTranslations] = useState([
  { lang: 'fr', title: '' },
  { lang: 'en', title: '' },
  { lang: 'es', title: '' },
]);
  const [selectedLang, setSelectedLang] = useState('fr');
  const [editTagTranslations, setEditTagTranslations] = useState([
  { lang: 'fr', title: '' },
  { lang: 'en', title: '' },
  { lang: 'es', title: '' },
]);
const [editSelectedLang, setEditSelectedLang] = useState('fr');

  const handleAddTag = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    try {
      const value = await addItem('tags', {
        language: 'fr',
        translations: [
          { lang: 'fr', title: newTagName.trim() }
        ],
      }); 
      setNewTagName('');
    } catch (error) {
      console.error('Failed to add tag:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTag = async (id : string) => {
    if (!editedName.trim() || editedName === editingTag?.translations.find(t => t.lang === 'fr')?.title) {
      setEditingTag(null);
      return;
    }

    setSubmitting(true);
    try {
      await updateItem('tags', id, { name: editedName.trim() });
      setEditingTag(null);
    } catch (error) {
      console.error('Failed to update tag:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTag = async (id : string) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;

    try {
      await deleteItem('tags', id);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  if (loading) {
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

      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (newTagTranslations.every(t => !t.title.trim())) return;
            setSubmitting(true);
            try {
              await addItem('tags', {
                translations: newTagTranslations.map(t => ({ lang: t.lang, title: t.title.trim() })),
              });
              setNewTagTranslations([
                { lang: 'fr', title: '' },
                { lang: 'en', title: '' },
                { lang: 'es', title: '' },
              ]);
            } catch (error) {
              console.error('Failed to add tag:', error);
            } finally {
              setSubmitting(false);
            }
          }}
          className="flex gap-4 mb-8 items-center"
        >
          <div className="flex gap-2">
            {['fr', 'en', 'es'].map((lang) => (
              <button
                type="button"
                key={lang}
                className={`px-2 py-1 rounded ${selectedLang === lang ? 'bg-primary-500 text-white' : 'bg-neutral-200'}`}
                onClick={() => setSelectedLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={newTagTranslations.find(t => t.lang === selectedLang)?.title || ''}
            onChange={e => {
              setNewTagTranslations(newTagTranslations.map(t =>
                t.lang === selectedLang ? { ...t, title: e.target.value } : t
              ));
            }}
            placeholder={`Nouveau tag (${selectedLang.toUpperCase()})`}
            className="form-input flex-grow"
            disabled={submitting}
          />
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
                      value={editTagTranslations.find(t => t.lang === editSelectedLang)?.title || ''}
                      onChange={e => {
                        setEditTagTranslations(editTagTranslations.map(t =>
                          t.lang === editSelectedLang ? { ...t, title: e.target.value } : t
                        ));
                      }}
                      className="form-input flex-grow"
                      autoFocus
                      disabled={submitting}
                    />
                  </div>
                </div>
              ) : (
                <span>{tag.translations.find(t => t.lang == 'fr')?.title}</span>
              )}

              <div className="flex items-center space-x-2">
                {editingTag?.id === tag.id ? (
                  <>
                    <button
                      onClick={async () => {
                        setSubmitting(true);
                        try {
                          await updateItem('tags', tag.id, {
                            translations: editTagTranslations.map(t => ({ lang: t.lang, title: t.title.trim() })),
                          });
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
                        setEditTagTranslations(
                          ['fr', 'en', 'es'].map(lang => ({
                            lang,
                            title: tag.translations.find(t => t.lang === lang)?.title || '',
                          }))
                        );
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