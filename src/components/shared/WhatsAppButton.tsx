
import React from 'react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber,
  message = "Hello, I'm interested in your Bitcoin mining services."
}) => {
  // Format phone number to remove any non-numeric characters
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
  };
  
  return (
    <button
      onClick={handleWhatsAppClick}
      className={cn(
        "fixed z-40 rounded-full flex items-center justify-center shadow-lg",
        "bg-[#25D366] text-white hover:bg-[#22c35e] transition-all",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]",
        // Improved positioning and size for mobile
        "bottom-4 right-4 w-12 h-12 md:w-14 md:h-14"
      )}
      aria-label="Contact us on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="24" 
        height="24"
        className="w-5 h-5 md:w-6 md:h-6" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    </button>
  );
};

export default WhatsAppButton;
