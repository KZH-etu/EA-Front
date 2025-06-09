import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Language, LanguageType } from '../../api/types/languages/languages';
import { useLanguageStore } from '../../stores/useLanguageStore';

const LANG_TYPE_OPTIONS = [
  { value: LanguageType.INTERNATIONAL, label: 'International' },
  { value: LanguageType.LOCAL, label: 'Locale' }
];

// Liste de pays simplifiée, complète-la si besoin
const COUNTRY_OPTIONS = [
  'France', 'Belgique', 'Suisse', 'Canada', 'Cameroun', 'Côte d\'Ivoire', 'Sénégal', 'Madagascar', 'RDC', 'Burkina Faso', 'Mali', 'Togo', 'Bénin', 'Angleterre', 'USA', 'Brésil', 'Portugal', 'Espagne', 'Italie', 'Allemagne', 'Autre'
];

const LanguagesPage = () => {
  const {
    items: languages, 
    loading, 
    error, 
    hasFetched,
    fetchAll: fetchLanguages,
    create: addLanguage, 
    update: updateLanguage, 
    remove: deleteLanguage 
  } = useLanguageStore();

  useEffect(() => {
    if(!hasFetched) fetchLanguages();
  }, [hasFetched, fetchLanguages]);

  // Ajout
  const [newLang, setNewLang] = useState({ id: '', name: '', type: LanguageType.INTERNATIONAL, countryOfOrigin: '' });
  const [submitting, setSubmitting] = useState(false);

  // Edition
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLang, setEditLang] = useState({id: '', name: '', type: LanguageType.INTERNATIONAL, countryOfOrigin: '' });

  // Ajout d'une langue
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLang.id.trim() || !newLang.name.trim()) return;
    if (newLang.type === LanguageType.LOCAL && !newLang.countryOfOrigin.trim()) return;
    newLang.name = newLang.name.charAt(0).toUpperCase();
    setSubmitting(true);
    try {
      await addLanguage({ ...newLang });
      setNewLang({ id: '', name: '', type: LanguageType.INTERNATIONAL, countryOfOrigin: '' });
    } catch (err) {
      console.error('Erreur ajout langue', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Edition d'une langue
  const handleEdit = (lang: Language) => {
    setEditLang({ ...lang, countryOfOrigin: lang.countryOfOrigin ?? '' });
    setEditingId(lang.id);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLang.id.trim() || !editLang.name.trim()) return;
    if (editLang.type === LanguageType.LOCAL && !editLang.countryOfOrigin.trim()) return;

    setSubmitting(true);
    try {
      const { id, ...dataWithoutId } = editLang;
      await updateLanguage(id, dataWithoutId); // envoie seulement les champs modifiables
      setEditingId(null);
    } catch (err) {
      console.error('Erreur modification langue', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cette langue ?')) return;
    setSubmitting(true);
    try {
      console.log('code', id);
      await deleteLanguage(id);
    } catch (err) {
      console.error('Erreur suppression langue', err);
    } finally {
      setSubmitting(false);
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
      <h1 className="text-2xl font-bold mb-6">Gestion des Langues</h1>
      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {error}
        </div>
      )}

      {/* Formulaire d'ajout */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end mb-8 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Code (id)*</label>
          <input
            type="text"
            className="form-input"
            value={newLang.id}
            onChange={e => setNewLang(l => ({ ...l, id: e.target.value }))}
            placeholder="fr, en, es, pt..."
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            type="text"
            className="form-input"
            value={newLang.name}
            onChange={e => setNewLang(l => ({ ...l, name: e.target.value }))}
            placeholder="Français, English..."
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type *</label>
          <select
            className="form-input"
            value={newLang.type}
            onChange={e => setNewLang(l => ({
              ...l,
              type: e.target.value as LanguageType,
              origin: e.target.value === LanguageType.LOCAL ? l.countryOfOrigin : ''
            }))}
            required
            disabled={submitting}
          >
            {LANG_TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {newLang.type === LanguageType.LOCAL && (
          <div>
            <label className="block text-sm font-medium mb-1">Origine *</label>
            <input
              type="text"
              className="form-input"
              value={newLang.countryOfOrigin}
              onChange={e => setNewLang(l => ({ ...l, countryOfOrigin: e.target.value }))}
              placeholder="France, England..."
              required
              disabled={submitting}
            />
            <datalist id="country-list">
              {COUNTRY_OPTIONS.map(country => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </div>
        )}
        <button
          type="submit"
          className="btn-primary flex items-center"
          disabled={submitting}
        >
          <Plus size={20} className="mr-2" />
          Ajouter
        </button>
      </form>

      {/* Liste des langues */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-4">
          {languages.map(lang =>
            editingId === lang.id ? (
              <form
                key={lang.id}
                onSubmit={handleUpdate}
                className="flex flex-wrap gap-4 items-end bg-neutral-50 p-3 rounded"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editLang.id}
                    onChange={e => setEditLang(l => ({ ...l, id: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editLang.name}
                    onChange={e => setEditLang(l => ({ ...l, name: e.target.value }))}
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    className="form-input"
                    value={editLang.type}
                    onChange={e => setEditLang(l => ({
                      ...l,
                      type: e.target.value as LanguageType,
                      origin: e.target.value === LanguageType.LOCAL ? l.countryOfOrigin : ''
                    }))}
                    required
                    disabled={submitting}
                  >
                    {LANG_TYPE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {editLang.type === LanguageType.LOCAL && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Origine *</label>
                    <input
                      list="country-list"
                      type="text"
                      className="form-input"
                      value={editLang.countryOfOrigin}
                      onChange={e => setEditLang(l => ({ ...l, countryOfOrigin: e.target.value }))}
                      placeholder="France, England..."
                      required
                      disabled={submitting}
                    />
                    <datalist id="country-list">
                      {COUNTRY_OPTIONS.map(country => (
                        <option key={country} value={country} />
                      ))}
                    </datalist>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={submitting}
                >
                  <Save size={18} className="mr-2" />
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setEditingId(null)}
                  disabled={submitting}
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <div
                key={lang.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded"
              >
                <div>
                  <span className="font-semibold">{lang.name}</span>
                  <span className="ml-2 text-xs text-neutral-500">({lang.id})</span>
                  <span className="ml-2 text-xs text-neutral-500">{lang.type === LanguageType.INTERNATIONAL ? 'International' : 'Local'}</span>
                  {lang.countryOfOrigin && <span className="ml-2 text-xs text-neutral-400">({lang.countryOfOrigin})</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(lang)}
                    className="p-2 text-primary-600 hover:text-primary-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(lang.id)}
                    className="p-2 text-error hover:text-error/80"
                    disabled={submitting}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage;