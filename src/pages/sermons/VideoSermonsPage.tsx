import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Globe, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import SermonCard from '../../components/sermons/SermonCard';
import { useSermonsStore } from '../../stores/useSermonsStore';
import { useTagsStore } from '../../stores/useTagsStore';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useTranslation } from '../../hooks/useTranslation';
import TagSelector from '../../components/ui/TagSelector';
import LanguageSelector from '../../components/ui/LanguageSelector';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

const LOCATIONS = [
  'Assemblée d\'Abidjan',
  'Salle de Conférence',
  'Centre Biblique',
  'Autre'
];

const VideoSermonsPage = () => {
  const { sermons, loading, error, fetchSermons } = useSermonsStore();
  const { tags, fetchTags } = useTagsStore();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<any>(null);
  const [actionType, setActionType] = useState<'watch' | 'download' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPreacher, setSelectedPreacher] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  useEffect(() => {
    fetchSermons();
    fetchTags();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPreacher, selectedLanguage, selectedLocation, selectedTags, startYear, endYear, itemsPerPage]);

  const handleAction = (sermon: any, action: 'watch' | 'download') => {
    setSelectedSermon(sermon);
    setActionType(action);
    setShowLanguageSelector(true);
  };

  const handleLanguageSelect = (langCode: string) => {
    if (!selectedSermon || !actionType) return;

    const url = actionType === 'watch' 
      ? selectedSermon.videoUrlByLang[langCode]
      : selectedSermon.downloadUrlByLang[langCode];

    if (url) {
      window.open(url, '_blank');
    }

    setShowLanguageSelector(false);
    setSelectedSermon(null);
    setActionType(null);
  };

  const filteredSermons = sermons
    .filter(sermon => sermon.type === 'video')
    .filter(sermon => {
      const matchesSearch = sermon.translations.find(val => val.lang === currentLanguage)?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPreacher = !selectedPreacher || sermon.preacher === selectedPreacher;
      const matchesLanguage = !selectedLanguage || sermon.language === selectedLanguage;
      const matchesLocation = !selectedLocation || sermon.location === selectedLocation;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => sermon.tags.includes(tag));
      
      const sermonYear = new Date(sermon.date).getFullYear();
      const matchesStartYear = !startYear || sermonYear >= parseInt(startYear);
      const matchesEndYear = !endYear || sermonYear <= parseInt(endYear);
      
      return matchesSearch && matchesPreacher && matchesLanguage && matchesLocation && 
             matchesTags && matchesStartYear && matchesEndYear;
    })
    .map(sermon => ({
      ...sermon,
      title: sermon.translations.find(val => val.lang === currentLanguage)?.title || sermon.translations.find(val => val.lang === 'fr')?.title,
      description: sermon.translations.find(val => val.lang === currentLanguage)?.description || sermon.translations.find(val => val.lang === 'fr')?.description
    }));

  const totalPages = Math.ceil(filteredSermons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSermons = filteredSermons.slice(startIndex, startIndex + itemsPerPage);

  const uniquePreachers = [...new Set(sermons
    .filter(sermon => sermon.type === 'video')
    .map(sermon => sermon.preacher))];

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
    <div className="min-h-screen bg-neutral-100 pb-24">
      <PageHeader 
        title={t('nav.videoSermons')}
        subtitle={t('sermons.video.subtitle')}
        backgroundImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <div className="container-custom py-8">
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
            <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('common.preacher')}
                </label>
                <select
                  value={selectedPreacher}
                  onChange={(e) => setSelectedPreacher(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('sermons.allPreachers')}</option>
                  {uniquePreachers.map(preacher => (
                    <option key={preacher} value={preacher}>{preacher}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('common.language')}
                </label>
                <div className="relative">
                  <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('sermons.allLanguages')}</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('common.location')}
                </label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('sermons.allLocations')}</option>
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('common.date')}
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={startYear}
                    onChange={handleStartYearChange}
                    className="flex-1 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('sermons.fromYear')}</option>
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
                    <option value="">{t('sermons.toYear')}</option>
                    {YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('common.tags')}
                </label>
                <TagSelector
                  availableTags={tags.map(tag => tag.translations.find(t => t.lang === currentLanguage)?.title || 'untagged')}
                  selectedTags={selectedTags}
                  onChange={setSelectedTags}
                  placeholder={t('sermons.selectTags')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-neutral-600">
            {filteredSermons.length} {t('sermons.foundResults')}
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
        ) : paginatedSermons.length === 0 ? (
          <div className="text-center py-12 text-neutral-600">
            {t('sermons.noResults')}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSermons.map((sermon) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SermonCard 
                    sermon={sermon}
                    curentLanguage={currentLanguage}
                    onWatch={() => handleAction(sermon, 'watch')}
                    onDownload={() => handleAction(sermon, 'download')}
                  />
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
          setSelectedSermon(null);
          setActionType(null);
        }}
        onSelect={handleLanguageSelect}
        availableLanguages={selectedSermon?.availableLanguages || []}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default VideoSermonsPage;