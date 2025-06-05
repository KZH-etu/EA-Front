import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string | string[];
}

interface EventCardProps {
  event: EventProps;
}

const EventCard = ({ event }: EventCardProps) => {
  // Format date and time
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div 
      className="card border border-neutral-200 hover:border-primary-300 transition-all duration-300 h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center space-x-2">
          <Calendar size={20} className="text-secondary-500" />
          <span className="font-medium text-primary-600">{formattedDate}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        
        <p className="text-neutral-600 mb-4">{event.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm text-neutral-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-neutral-500" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-neutral-500" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;