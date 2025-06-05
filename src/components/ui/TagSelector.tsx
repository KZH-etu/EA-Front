import { useState, useRef, useEffect } from 'react';
import { Tag, X, ChevronDown } from 'lucide-react';
import { Tags } from '../../stores/useTagsStore';

interface TagSelectorProps {
  availableTags: Tags[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagSelector = ({ availableTags, selectedTags, onChange, placeholder = 'Sélectionner des tags' }: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="form-input min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTags.length > 0 ? (
          selectedTags.map(tag => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md flex items-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleTagRemove(tag);
              }}
            >
              {tag}
              <X size={14} className="ml-1 hover:text-primary-900" />
            </span>
          ))
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
          {availableTags.map(tag => (
            <div
              key={tag.id}
              className={`
                flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-50
                ${selectedTags.includes(tag.translations.find(t => t.lang == 'fr')?.title || '') ? 'bg-primary-50' : ''}
              `}
              onClick={() => handleTagSelect(tag.translations.find(t => t.lang == 'fr')?.title || '')}
            >
              <Tag size={16} className={`mr-2 ${selectedTags.includes(tag.translations.find(t => t.lang == 'fr')?.title || '') ? 'text-primary-500' : 'text-neutral-400'}`} />
              <span>{tag.translations.find(t => t.lang == 'fr')?.title || ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;