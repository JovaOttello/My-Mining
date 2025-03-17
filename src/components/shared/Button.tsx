
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLink?: boolean;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLink = false,
  href = '',
  external = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/80",
    outline: "border border-muted bg-transparent hover:bg-secondary/50 text-foreground focus:ring-muted",
    ghost: "bg-transparent hover:bg-secondary/50 text-foreground focus:ring-muted",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive/80"
  };
  
  const sizes = {
    sm: "text-sm py-1.5 px-3 gap-1.5",
    md: "text-base py-2 px-4 gap-2",
    lg: "text-lg py-2.5 px-5 gap-2.5"
  };
  
  const buttonStyles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className
  );
  
  const content = (
    <>
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </>
  );
  
  if (isLink) {
    const LinkComponent = external ? 
      ({ children }: { children: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyles}>
          {children}
        </a>
      ) : 
      ({ children }: { children: React.ReactNode }) => (
        <Link to={href} className={buttonStyles}>
          {children}
        </Link>
      );
      
    return <LinkComponent>{content}</LinkComponent>;
  }
  
  return (
    <button 
      className={buttonStyles} 
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
