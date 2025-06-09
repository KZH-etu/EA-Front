import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Bookmark } from 'lucide-react';
import { Tag } from '../../api/types/tags/tags';

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagSelector = ({ availableTags, selectedTags, onChange, placeholder = 'Sélectionner des tags' }: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagSelect = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  const handleTagRemove = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Filtrer les tags selon la recherche
  const filteredTags = availableTags.filter(tag =>
    tag.translations.find(t => t.language === 'fr')?.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="form-input min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
         {selectedTags.length > 0 ? (
          selectedTags.map(tagId => {
            const tag = availableTags.find(t => t.id === tagId);
            const tagTitle = tag?.translations.find(tr => tr.language === 'fr')?.title || tagId;
            return (
              <span
                key={tagId}
                className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md flex items-center text-sm"
                onClick={e => {
                  e.stopPropagation();
                  handleTagRemove(tagId);
                }}
              >
                {tagTitle}
                <X size={14} className="ml-1 hover:text-primary-900" />
              </span>
            );
          })
        ) : (
          <span className="text-neutral-500">{placeholder}</span>
        )}
        <ChevronDown
          size={20}
          className={`ml-auto text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Barre de recherche */}
          <div className="p-2">
            <input
              type="text"
              className="w-full border border-neutral-200 rounded px-2 py-1 text-sm"
              placeholder="Rechercher un tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              onClick={e => e.stopPropagation()}
            />
          </div>
          {filteredTags.length > 0 ? (
            filteredTags.map(tag => {
              const tagTitle = tag.translations.find(t => t.language === 'fr')?.title || tag.id;
              return (
                <div
                  key={tag.id}
                  className={`
                    flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-50
                    ${selectedTags.includes(tag.id) ? 'bg-primary-50' : ''}
                  `}
                  onClick={() => handleTagSelect(tag.id)}
                >
                  <Bookmark size={16} className={`mr-2 ${selectedTags.includes(tag.id) ? 'text-primary-500' : 'text-neutral-400'}`} />
                  <span>{tagTitle}</span>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-neutral-400 text-sm">Aucun tag trouvé</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelector;