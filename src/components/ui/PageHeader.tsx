import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ 
  title, 
  subtitle,
  backgroundImage = 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
}: PageHeaderProps) => {
  return (
    <section 
      className="relative bg-primary-900 text-white h-[40vh] min-h-[300px] flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;