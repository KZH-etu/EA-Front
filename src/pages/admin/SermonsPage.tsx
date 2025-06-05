import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminStore } from '../../stores/useAdminStore';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  FileText,
  User,
  Calendar,
  X,
  Upload,
  Headphones,
  Video,
  ArrowUp,
  ArrowDown,
  Globe,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TagSelector from '../../components/ui/TagSelector';
import LanguageContentForm from '../../components/admin/LanguageContentForm';
import { DEFAULT_PREACHERS } from '../../lib/mockAdminData';
import { Sermon } from '../../stores/useSermonsStore';

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const LOCATIONS = [
  'Assemblée d\'Abidjan',
  'Salle de Conférence',
  'Centre Biblique',
  'Autre'
];

const SermonsPage = () => {
  const { sermons, tags, loading, error, addItem, updateItem, deleteItem } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [languageContent, setLanguageContent] = useState<Record<string, any>>({});
  
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      type: 'audio',
      tags: [] as string[],
      preacher: DEFAULT_PREACHERS[0],
      language: 'fr',
      title: '',
      date: '',
      mediaUrl: '',
      location: LOCATIONS[0],
      description: ''
    }
  });
  
  const selectedType = watch('type');
  const selectedTags = watch('tags') || [];

  const handleSort = (field : string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const onSubmit = async (data : Sermon) => {
    setSubmitting(true);
    try {
      // Transform language content into required format
      const availableLanguages = Object.keys(languageContent);
      const audioUrlByLang = { lang: '' };
      const downloadUrlByLang = { lang: '' };

      availableLanguages.forEach((lang : string) => {
        audioUrlByLang.lang = languageContent[lang].audioUrl;
        downloadUrlByLang.lang = languageContent[lang].downloadUrl;
      });

      const sermonData = {
        ...data,
        availableLanguages,
        audioUrlByLang,
        downloadUrlByLang
      };

      if (editingSermon) {
        await updateItem('sermons', editingSermon.id, sermonData);
      } else {
        await addItem('sermons', sermonData);
      }
      setShowForm(false);
      setEditingSermon(null);
      reset();
      setLanguageContent({});
    } catch (error) {
      console.error('Failed to save sermon:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id : string) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      await deleteItem('sermons', id);
    }
  };

  const handleEdit = (sermon : Sermon) => {
    setEditingSermon(sermon);
    setShowForm(true);
    
    // Transform existing language content
    const content = { lang: {} };
    sermon.availableLanguages.forEach(lang => {
      content.lang = {
        code: lang,
        audioUrl: sermon.translations.find(t => t.lang === lang)?.audioUrl || '',
        downloadUrl: sermon.translations.find(t => t.lang === lang)?.downloadUrl || ''
      };
    });
    
    setLanguageContent(content);
    reset({
      ...sermon,
      date: sermon.date.split('T')[0],
      tags: sermon.tags,
    });
  };

  const filteredSermons = sermons.filter(sermon =>
    sermon.translations.find(t => t.lang === 'fr')?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold">Gestion des Sermons</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingSermon(null);
            reset({
              type: 'audio',
              tags: [],
              preacher: DEFAULT_PREACHERS[0],
              language: 'fr'
            });
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter
        </button>
      </div>

      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-left">
                <button
                  className="flex items-center text-sm font-medium text-neutral-500"
                  onClick={() => handleSort('title')}
                >
                  Titre
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">
                <button
                  className="flex items-center text-sm font-medium text-neutral-500"
                  onClick={() => handleSort('preacher')}
                >
                  Prédicateur
                  {sortField === 'preacher' && (
                    sortDirection === 'asc' ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  className="flex items-center text-sm font-medium text-neutral-500"
                  onClick={() => handleSort('date')}
                >
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">Tags</th>
              <th className="px-6 py-3 text-left">
                <button
                  className="flex items-center text-sm font-medium text-neutral-500"
                  onClick={() => handleSort('views')}
                >
                  Vues
                  {sortField === 'views' && (
                    sortDirection === 'asc' ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSermons.map((sermon) => (
              <tr key={sermon.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="px-6 py-4">{sermon.translations.find(t => t.lang === 'fr')?.title}</td>
                <td className="px-6 py-4">
                  {sermon.type === 'audio' ? (
                    <Headphones size={18} className="text-primary-500" />
                  ) : (
                    <Video size={18} className="text-primary-500" />
                  )}
                </td>
                <td className="px-6 py-4">{sermon.preacher}</td>
                <td className="px-6 py-4">
                  {format(new Date(sermon.date), 'dd MMMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{sermon.views}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(sermon)}
                    className="text-primary-600 hover:text-primary-800 p-2"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(sermon.id)}
                    className="text-error hover:text-error/80 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingSermon ? 'Modifier' : 'Ajouter'} un Sermon
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSermon(null);
                  reset();
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <label htmlFor="preacher" className="block text-sm font-medium text-neutral-700 mb-1">
                  Prédicateur
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    id="preacher"
                    className="pl-10 w-full form-input"
                    {...register('preacher', { required: 'Le prédicateur est requis' })}
                  >
                    {DEFAULT_PREACHERS.map(preacher => (
                      <option key={preacher} value={preacher}>{preacher}</option>
                    ))}
                    <option value="autre">Autre</option>
                  </select>
                </div>
                {errors.preacher && (
                  <p className="mt-1 text-sm text-error">{errors.preacher.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="date"
                    id="date"
                    className="pl-10 w-full form-input"
                    {...register('date', { required: 'La date est requise' })}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-error">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Type de Sermon
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="audio"
                      {...register('type', { required: 'Le type est requis' })}
                      className="form-radio text-primary-500"
                    />
                    <span>Audio</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="video"
                      {...register('type', { required: 'Le type est requis' })}
                      className="form-radio text-primary-500"
                    />
                    <span>Vidéo</span>
                  </label>
                </div>
                {errors.type && (
                  <p className="mt-1 text-sm text-error">{errors.type.message}</p>
                )}
              </div>

              {selectedType === 'video' && (
                <div>
                  <label htmlFor="mediaUrl" className="block text-sm font-medium text-neutral-700 mb-1">
                    Lien YouTube
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="mediaUrl"
                      className="pl-10 w-full form-input"
                      placeholder="https://youtube.com/watch?v=..."
                      {...register('mediaUrl', { 
                        required: 'Le lien média est requis',
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                          message: 'Veuillez entrer un lien YouTube valide'
                        }
                      })}
                    />
                  </div>
                  {errors.mediaUrl && (
                    <p className="mt-1 text-sm text-error">{errors.mediaUrl.message}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-neutral-700 mb-1">
                  Langue
                </label>
                <div className="relative">
                  <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    id="language"
                    className="pl-10 w-full form-input"
                    {...register('language', { required: 'La langue est requise' })}
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.language && (
                  <p className="mt-1 text-sm text-error">{errors.language.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                  Lieu
                </label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    id="location"
                    className="pl-10 w-full form-input"
                    {...register('location', { required: 'Le lieu est requis' })}
                  >
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-error">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
                  Tags
                </label>
                <TagSelector
                  availableTags={tags}
                  selectedTags={selectedTags}
                  onChange={(newTags) => setValue('tags', newTags)}
                  placeholder="Sélectionner des tags"
                />
              </div>

              <LanguageContentForm
                availableLanguages={LANGUAGES.map(l => l.code)}
                languageContent={languageContent}
                register={register}
                errors={errors}
                onChange={setLanguageContent}
                type="sermon"
              />

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSermon(null);
                    reset();
                  }}
                  className="btn-outline"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex items-center"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      {editingSermon ? 'Mise à jour...' : 'Ajout...'}
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="mr-2" />
                      {editingSermon ? 'Mettre à jour' : 'Ajouter'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SermonsPage;