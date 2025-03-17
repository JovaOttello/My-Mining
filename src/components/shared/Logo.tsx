
import React from 'react';
import { Bitcoin, Pickaxe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true, className }) => {
  const iconSize = {
    sm: 20,
    md: 24,
    lg: 32,
  };
  
  const fontSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link 
      to="/" 
      className={cn("flex items-center gap-2 group transition-all", className)}
    >
      <div className="relative flex-shrink-0">
        <Bitcoin 
          size={iconSize[size]} 
          className="text-bitcoin animate-pulse-subtle" 
        />
        <Pickaxe 
          size={iconSize[size] * 0.75} 
          className="absolute -bottom-1 -right-1 text-gray-300" 
        />
      </div>
      
      {withText && (
        <div className={`font-bold tracking-tight ${fontSize[size]}`}>
          <span className="text-white">Bit</span>
          <span className="text-bitcoin">Mine</span>
          <span className="text-primary">Social</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
