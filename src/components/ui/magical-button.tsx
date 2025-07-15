'use client';

import type { ReactNode, MouseEventHandler } from 'react';

interface MagicalButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const MagicalButton = ({ children, onClick, variant = 'primary', className = '', type = 'button' }: MagicalButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        relative px-8 py-3 rounded-lg font-bold text-white
        transform transition-all duration-300 hover:scale-105
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-royal-purple to-enchanted-blue shadow-lg shadow-royal-purple/50' 
          : 'bg-gradient-to-r from-mystic-gold to-yellow-500 shadow-lg shadow-mystic-gold/50 text-shadow-black'
        }
        overflow-hidden
        ${className}
      `}
    >
      <div 
        className="
          absolute top-0 left-0 w-full h-full
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          transform -translate-x-full
          group-hover:translate-x-full transition-transform duration-700 ease-in-out
        "
      ></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
