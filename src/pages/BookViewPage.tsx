import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Book, ChevronLeft, ChevronRight, ArrowLeft, Globe } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Books, useBooksStore } from '../stores/useBooksStore';
import { useTagsStore } from '../stores/useTagsStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from '../components/ui/LanguageSelector';
import { mockAdminTags } from '../lib/mockAdminData';
import { ContentTranslations } from '../lib/interfacesData';

function getTranslation(translations : ContentTranslations[], lang : string, fallback = 'fr') {
  return translations.find(t => t.lang === lang) 
      || translations.find(t => t.lang === fallback);
}

interface BookCardProps {
  book: Books;
}

const BookCard = ({ book }: BookCardProps) => {
  const { currentLanguage } = useLanguageStore();
  const translation = getTranslation(book.translations, currentLanguage);

  return (
    <Link to={`/books/${book.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[2/3] bg-neutral-100">
          {book.coverUrl ? (
            <img 
              src={book.coverUrl}
              alt={translation?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Book size={48} className="text-neutral-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-bold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {translation?.title}
          </h3>
          <p className="text-xs text-neutral-600">
            {book.author}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ScrollableBookList = ({ title, books, tag, author }: { title: string; books: Books[]; tag?: string; author?: string }) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(containerRef.current.scrollLeft + scrollAmount);
    }
  };

  const handleSeeAll = () => {
    const searchParams = new URLSearchParams();
    if (tag) searchParams.set('tags', tag);
    if (author) searchParams.set('author', author);
    navigate(`/books?${searchParams.toString()}`);
  };

  const displayedBooks = books.slice(0, 10);
  const hasMore = books.length > 10;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {author 
            ? `${t('books.otherBooksByAuthor')} ${author}`
            : tag 
              ? `${t('books.booksWithTag')} ${ tag }`
              : title
          }
        </h2>
        {hasMore && (
          <button 
            onClick={handleSeeAll}
            className="btn-outline text-sm"
          >
            {t('common.seeAll')} ({books.length})
          </button>
        )}
      </div>
      <div className="relative group">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayedBooks.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-48">
              <BookCard book={book} />
            </div>
          ))}
        </div>
        
        {displayedBooks.length > 4 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2"
              style={{ visibility: scrollPosition <= 0 ? 'hidden' : 'visible' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-1/2"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

function BookViewPage() {
  const { id } = useParams();
  const { books, loading, error, fetchBooks } = useBooksStore();
  const { tags } = useTagsStore();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [relatedBooks, setRelatedBooks] = useState<{
    byAuthor: any[];
    byTags: { tag: ContentTranslations | undefined; books: any[] }[];
  }>({
    byAuthor: [],
    byTags: []
  });
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [actionType, setActionType] = useState<'download' | 'read' | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length && id) {
      const book = books.find(b => b.id === id);
      if (book) {
        const translatedTags = book.tags.map(tagID => {
          const tag = tags.find(t => t.id === tagID);
          return tag?.translations.find(value => value.lang == currentLanguage) || tag?.translations.find(value => value.lang == 'fr');
        });

        setCurrentBook({
          ...book,
          description: book.translations.find(value => value.lang == currentLanguage)?.description || book.translations.find(value => value.lang == 'fr')?.description,
          title: book.translations.find(value => value.lang == currentLanguage)?.title || book.translations.find(value => value.lang == 'fr')?.title,
          translatedTags
        });
        
        const authorBooks = books.filter(b => 
          b.author === book.author && b.id !== book.id
        );

        const tagGroups = book.tags.map(tagID => {
          const tag = tags.find(t => t.id === tagID);
          const translatedTag = tag?.translations.find(value => value.lang == currentLanguage) || tag?.translations.find(value => value.lang == 'fr');
          
          return {
            tag: translatedTag,
            originalTag: tagID,
            books: books.filter(b => 
              b.id !== book.id && 
              b.tags.includes(tagID)
            ).map(b => ({
              ...b,
              title: b.translations.find(value => value.lang == currentLanguage)?.title || b.translations.find(value => value.lang == 'fr')?.title,
              description: b.translations.find(value => value.lang == currentLanguage)?.description  || b.translations.find(value => value.lang == 'fr')?.description
            }))
          };
        }).filter(group => group.books.length > 0);

        setRelatedBooks({
          byAuthor: authorBooks.map(b => ({
            ...b,
            title: b.translations.find(value => value.lang == currentLanguage)?.title || b.translations.find(value => value.lang == 'fr')?.title,
            description: b.translations.find(value => value.lang == currentLanguage)?.description || b.translations.find(value => value.lang == 'fr')?.description
          })),
          byTags: tagGroups
        });
      }
    }
  }, [books, id, currentLanguage, tags]);

  const handleAction = (action: 'download' | 'read') => {
    setActionType(action);
    setShowLanguageSelector(true);
  };

  const handleLanguageSelect = (langCode: string) => {
    if (!currentBook || !actionType) return;

    const url = actionType === 'download' 
      ? currentBook.downloadUrlByLang[langCode]
      : currentBook.readUrlByLang[langCode];

    if (url) {
      if (actionType === 'download') {
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    }

    setShowLanguageSelector(false);
    setActionType(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !currentBook) {
    return (
      <div className="container-custom py-16">
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error || t('books.notFound')}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title={currentBook.title}
        subtitle={`${t('common.author')}: ${currentBook.author}`}
        backgroundImage="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
      />
      
      <div className="container-custom">
        <div className="py-6">
          <Link 
            to="/books" 
            className="inline-flex items-center px-4 py-2 text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 text-neutral-500 group-hover:text-primary-500 transition-colors" />
            <span>{t('books.backToLibrary')}</span>
          </Link>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-1">
              <div className="aspect-[2/3] bg-neutral-100 rounded-lg flex items-center justify-center">
                {currentBook.coverUrl ? (
                  <img 
                    src={currentBook.coverUrl}
                    alt={currentBook.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Book size={64} className="text-neutral-300" />
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full">
                  {t(`books.categories.${currentBook.category}`)}
                </span>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {currentBook.year}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">{currentBook.title}</h1>
                <div className="flex items-center text-lg text-neutral-600">
                  <User size={20} className="mr-2" />
                  {currentBook.author}
                </div>
              </div>

              {currentBook.description && (
                <div>
                  <h2 className="text-xl font-bold mb-2">{t('books.description')}</h2>
                  <p className="text-neutral-600 whitespace-pre-line">
                    {currentBook.description}
                  </p>
                </div>
              )}

              {currentBook.tags && currentBook.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">{t('common.tags')}</h2>
                  <div className="flex flex-wrap gap-2">
                    {currentBook.tags.map((tag: string, index: number) => {
                      const data = mockAdminTags.find(value => value.id === tag);
                      return(
                        <span
                          key={index}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm flex items-center"
                        >
                          <Tag size={14} className="mr-1" />
                          {data ? data.translations.find(value => value.lang == currentLanguage)?.title || data.translations.find(value => value.lang == 'fr')?.title : ''}
                        </span>
                      ); 
                      })
                    }
                  </div>
                </div>
              )}

              {currentBook?.availableLanguages && currentBook.availableLanguages.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Globe size={20} className="text-primary-500" />
                    <span className="font-medium">{t('books.availableLanguages')}:</span>
                    <div className="flex gap-2">
                      {currentBook.availableLanguages.map((langCode: string) => {
                        const lang = {
                          fr: { name: 'Français', flag: '🇫🇷' },
                          en: { name: 'English', flag: '🇬🇧' },
                          es: { name: 'Español', flag: '🇪🇸' },
                          de: { name: 'Deutsch', flag: '🇩🇪' }
                        }[langCode];

                        return lang ? (
                          <span
                            key={langCode}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full text-sm"
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleAction('read')}
                  className="btn-primary"
                >
                  {t('common.readOnline')}
                </button>
                <button
                  onClick={() => handleAction('download')}
                  className="btn-outline"
                >
                  {t('common.download')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {relatedBooks.byAuthor.length > 0 && (
          <ScrollableBookList
            title={`${t('books.otherBooksByAuthor')} ${currentBook.author}`}
            books={relatedBooks.byAuthor}
            author={currentBook.author}
          />
        )}

        {relatedBooks.byTags.map(({ tag, books }) => (
          <ScrollableBookList
            key={tag?.title || 'untagged'}
            title={`${t('books.booksWithTag')} ${ tag }`}
            books={books}
            tag={tag?.title || 'untagged'}
          />
        ))}

        <LanguageSelector
          isOpen={showLanguageSelector}
          onClose={() => {
            setShowLanguageSelector(false);
            setActionType(null);
          }}
          onSelect={handleLanguageSelect}
          availableLanguages={currentBook?.availableLanguages || []}
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
}

export default BookViewPage;