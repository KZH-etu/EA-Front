import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminStore } from '../../stores/useAdminStore';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  BookOpen,
  User,
  FileText,
  X,
  Upload,
  Calendar,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import TagSelector from '../../components/ui/TagSelector';
import LanguageContentForm from '../../components/admin/LanguageContentForm';
import { Book } from '../../stores/useBooksStore';

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const BooksPage = () => {
  const { books, tags, loading, error, addItem, updateItem, deleteItem } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [languageContent, setLanguageContent] = useState<Record<string, any>>({});
  
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      category: 'book',
      language: 'fr',
      tags: []
    }
  });
  
  const selectedCategory = watch('category');
  const selectedTags = watch('tags') || [];

  const onSubmit = async (data : Book) => {
    setSubmitting(true);
    try {
      // Transform language content into required format
      const availableLanguages = Object.keys(languageContent);
      const downloadUrlByLang = {};
      const readUrlByLang = {};

      availableLanguages.forEach(lang => {
        downloadUrlByLang[lang] = languageContent[lang].downloadUrl;
        readUrlByLang[lang] = languageContent[lang].readUrl;
      });

      const bookData = {
        ...data,
        availableLanguages,
        downloadUrlByLang,
        readUrlByLang
      };

      if (editingBook) {
        await updateItem('books', editingBook.id, bookData);
      } else {
        await addItem('books', bookData);
      }
      setShowForm(false);
      setEditingBook(null);
      reset();
      setLanguageContent({});
    } catch (error) {
      console.error('Failed to save book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id : string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteItem('books', id);
    }
  };

  const handleEdit = (book : Book) => {
    setEditingBook(book);
    setShowForm(true);
    
    // Transform existing language content
    const content = {};
    book.availableLanguages.forEach(lang => {
      content[lang] = {
        code: lang,
        downloadUrl: book.downloadUrlByLang[lang],
        readUrl: book.readUrlByLang[lang]
      };
    });
    
    setLanguageContent(content);
    reset({
      ...book,
      tags: book.tags || []
    });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold">Gestion des Livres et Brochures</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingBook(null);
            reset({
              category: 'book',
              language: 'fr',
              tags: []
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="text-primary-600 hover:text-primary-800 p-2"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-error hover:text-error/80 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-neutral-600">
                <User size={18} className="mr-2" />
                <span>{book.author}</span>
              </div>

              <div className="flex items-center text-neutral-600">
                <Calendar size={18} className="mr-2" />
                <span>{book.year}</span>
              </div>

              <div className="flex items-center text-neutral-600">
                <Globe size={18} className="mr-2" />
                <span>{LANGUAGES.find(l => l.code === book.language)?.name}</span>
              </div>
            </div>

            {book.description && (
              <p className="text-neutral-500 text-sm mb-4 line-clamp-3">
                {book.description}
              </p>
            )}

            {book.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {book.tags.map((tag : string) => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-700 text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
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
                {editingBook ? 'Modifier' : 'Ajouter'} un {selectedCategory === 'book' ? 'Livre' : 'Brochure'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingBook(null);
                  reset();
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="book"
                      {...register('category')}
                      className="form-radio text-primary-500"
                    />
                    <span>Livre</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="brochure"
                      {...register('category')}
                      className="form-radio text-primary-500"
                    />
                    <span>Brochure</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Titre
                </label>
                <div className="relative">
                  <BookOpen size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
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
                <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-1">
                  Auteur
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    id="author"
                    className="pl-10 w-full form-input"
                    {...register('author', { required: 'L\'auteur est requis' })}
                  />
                </div>
                {errors.author && (
                  <p className="mt-1 text-sm text-error">{errors.author.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-neutral-700 mb-1">
                  Année
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="number"
                    id="year"
                    className="pl-10 w-full form-input"
                    {...register('year', {
                      required: 'L\'année est requise',
                      min: { value: 1900, message: 'L\'année doit être supérieure à 1900' },
                      max: { value: new Date().getFullYear(), message: 'L\'année ne peut pas être future' }
                    })}
                  />
                </div>
                {errors.year && (
                  <p className="mt-1 text-sm text-error">{errors.year.message}</p>
                )}
              </div>

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
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                  Description
                </label>
                <div className="relative">
                  <FileText size={20} className="absolute left-3 top-3 text-neutral-400" />
                  <textarea
                    id="description"
                    rows={4}
                    className="pl-10 w-full form-input"
                    {...register('description')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
                  Tags
                </label>
                <TagSelector
                  availableTags={tags.map(tag => tag.name)}
                  selectedTags={selectedTags}
                  onChange={(newTags) => setValue('tags', newTags)}
                  placeholder="Sélectionner des tags"
                />
              </div>

              <LanguageContentForm
                availableLanguages={LANGUAGES.map(l => l.code)}
                languageContent={languageContent}
                onChange={setLanguageContent}
                type="book"
              />

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBook(null);
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
                      {editingBook ? 'Mise à jour...' : 'Ajout...'}
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="mr-2" />
                      {editingBook ? 'Mettre à jour' : 'Ajouter'}
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

export default BooksPage;