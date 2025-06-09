import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Book, Globe, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTagStore } from '../stores/useTagStore';
import { useLanguageStore } from '../stores/useFrontEndLanguageStore';
import { useTranslation } from '../hooks/useTranslation';
import PageHeader from '../components/ui/PageHeader';
import TagSelector from '../components/ui/TagSelector';
import LanguageSelector from '../components/ui/LanguageSelector';
import { useBooks } from '../hooks/useBooks';
import { Document } from '../api/types/documents/documents';
import { MediaType } from '../api/types/document-media/document-media';

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

const LOCATIONS = [
  'Assemblée d\'Abidjan',
  'Centre Biblique',
  'Salle de Conférence',
  'Autre'
];

const BooksPage = () => {
  const { books, loading, error} = useBooks();
  const { items: tags,hasFetched, fetchAll: fetchTags } = useTagStore();
  const { currentLanguage } = useLanguageStore();  //  <--- This now needs to be a language ID for it to work!!!
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Document |  null>(null);
  const [actionType, setActionType] = useState<'download' | 'read' | null>(null);

  useEffect(() => {
    if(hasFetched) fetchTags();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedAuthor, selectedLanguage, selectedLocation, selectedTags, startYear, endYear, itemsPerPage]);

  const handleAction = (book: Document, action: 'download' | 'read') => {
    setSelectedBook(book);
    setActionType(action);
    setShowLanguageSelector(true);
  };

  
  const handleLanguageSelect = (langCode: string) => {
    if (!selectedBook || !actionType) return;

    const translation = selectedBook.versions?.find(t => t.languageId == langCode);
    const url = translation?.mediaItems?.find(m => m.mediaType == MediaType.TEXT)?.url;

    if (url) {
      if (actionType === 'download') {
        // Déclenche le téléchargement du PDF
        const link = document.createElement('a');
        link.href = url;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Lecture en ligne (ouvre dans un nouvel onglet)
        window.open(url, '_blank');
      }
    }

    setShowLanguageSelector(false);
    setSelectedBook(null);
    setActionType(null);
  };

  const filteredBooks = books.filter(book => {

    const categoriesToString = book.categories?.map( cat => cat.toString())
    const languageList = book.versions?.map( v => v.languageId)
    const tagsToStrings = book.tags?.map(tag => tag.id)   // we need to use the id for the tags

    const matchesSearch = book.versions?.find(value => value.languageId == currentLanguage)?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.bookMeta?.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || categoriesToString?.includes(selectedCategory)
    const matchesAuthor = !selectedAuthor ||  book.bookMeta?.author === selectedAuthor;
    const matchesLanguage = !selectedLanguage || languageList?.includes(selectedLanguage);
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => tagsToStrings?.includes(tag));
    
    return matchesSearch && matchesCategory && matchesAuthor && matchesLanguage && matchesTags;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const uniqueAuthors = [...new Set(books.map(book =>  book.bookMeta?.author))].sort();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStartYear(value);
    if (value && endYear && parseInt(value) > parseInt(endYear)) {
      setEndYear(value);
    }
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEndYear(value);
    if (value && startYear && parseInt(value) < parseInt(startYear)) {
      setStartYear(value);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <PageHeader 
        title={t('nav.books')}
        subtitle={t('books.subtitle')}
        backgroundImage="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
      />

      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center gap-2"
            >
              <Filter size={20} />
              <span>{t('common.filters')}</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('common.categories')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (e.target.value !== 'sermon') {
                      setSelectedLocation('');
                      setStartYear('');
                      setEndYear('');
                    }
                  }}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('books.allCategories')}</option>
                  <option value="book">{t('books.books')}</option>
                  <option value="brochure">{t('books.brochures')}</option>
                  <option value="sermon">{t('books.sermonTranscripts')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('common.author')}
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('books.allAuthors')}</option>
                    {uniqueAuthors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('common.language')}
                </label>
                <div className="relative">
                  <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('books.allLanguages')}</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCategory === 'sermon' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('common.location')}
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">{t('books.allLocations')}</option>
                      {LOCATIONS.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedCategory === 'sermon' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('common.date')}
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={startYear}
                      onChange={handleStartYearChange}
                      className="flex-1 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">{t('books.fromYear')}</option>
                      {YEARS.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <span className="text-neutral-400">-</span>
                    <select
                      value={endYear}
                      onChange={handleEndYearChange}
                      className="flex-1 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">{t('books.toYear')}</option>
                      {YEARS.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="xl:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('common.tags')}
                </label>
                <TagSelector
                  availableTags={tags}
                  selectedTags={selectedTags}
                  onChange={setSelectedTags}
                  placeholder={t('books.selectTags')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-neutral-600">
            {filteredBooks.length} {t('books.foundResults')}
          </div>
          
          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600">
              {t('books.itemsPerPage')}
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-input py-1 pl-3 pr-8 text-sm"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-error bg-error/10 p-4 rounded-lg">
            {error}
          </div>
        ) : paginatedBooks.length === 0 ? (
          <div className="text-center py-12 text-neutral-600">
            {t('books.noResults')}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {paginatedBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                    <Link to={`/books/${book.id}`}>
                      <div className="relative aspect-[2/3] bg-neutral-100">
                        {book.coverUrl ? (
                          <img 
                            src={book.coverUrl}
                            alt={book.translations.find(value => value.lang == currentLanguage)?.title || book.translations.find(value => value.lang == 'fr')?.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Book size={32} className="text-neutral-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                    </Link>

                    <div className="p-3">
                      <Link to={`/books/${book.id}`}>
                        <h3 className="text-sm font-bold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                          {book.translations.find(value => value.lang == currentLanguage)?.title || book.translations.find(value => value.lang == 'fr')?.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-600 mb-2 line-clamp-1">
                        {book.author}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded-full text-xs">
                          {t(`books.categories.${book.category}`)}
                        </span>
                        <span className="text-neutral-500">
                          {book.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 border-t border-neutral-100">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleAction(book, 'read')}
                          className="text-xs px-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                        >
                          {t('common.readOnline')}
                        </button>
                        <button
                          onClick={() => handleAction(book, 'download')}
                          className="text-xs px-2 py-1 border border-primary-500 text-primary-500 rounded hover:bg-primary-50 transition-colors"
                        >
                          {t('common.download')}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg border ${
                      currentPage === page
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <LanguageSelector
        isOpen={showLanguageSelector}
        onClose={() => {
          setShowLanguageSelector(false);
          setSelectedBook(null);
          setActionType(null);
        }}
        onSelect={handleLanguageSelect}
        availableLanguages={selectedBook?.availableLanguages || []}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default BooksPage;