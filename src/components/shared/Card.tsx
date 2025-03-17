
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false,
  padding = 'md',
}) => {
  const baseStyles = "rounded-xl overflow-hidden w-full";
  
  const variantStyles = {
    default: "bg-card text-card-foreground border border-border",
    glass: "bg-card/40 backdrop-blur-lg border border-white/10",
    outlined: "bg-transparent border border-border"
  };
  
  const paddingStyles = {
    none: "p-0",
    sm: "p-2",
    md: "p-3 md:p-5",
    lg: "p-4 md:p-7"
  };
  
  const hoverStyles = hover ? "transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]" : "";
  
  return (
    <div className={cn(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      hoverStyles,
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
