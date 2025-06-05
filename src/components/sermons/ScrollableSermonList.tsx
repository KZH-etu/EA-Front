import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SermonCard from './SermonCard';

interface ScrollableSermonListProps {
  title: string;
  sermons: any[];
}

const ScrollableSermonList = ({ title, sermons }: ScrollableSermonListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (sermons.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="relative group">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sermons.map((sermon) => (
            <div key={sermon.id} className="flex-shrink-0 w-80">
              <SermonCard sermon={sermon} />
            </div>
          ))}
        </div>
        
        {sermons.length > 3 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2"
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

export default ScrollableSermonList;