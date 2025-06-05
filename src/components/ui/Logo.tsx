import { Menu as Menorah } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = 'h-10 w-auto' }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center">
        <img src="/IMG_1636.PNG" alt="Logo" className='h-16'/>
      </div>
    </div>
  );
};

export default Logo;