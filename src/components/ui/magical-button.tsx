
'use client';

import type { ReactNode, MouseEventHandler } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface MagicalButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
}

export const MagicalButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', asChild = false }: MagicalButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50',
    secondary: 'bg-gradient-to-r from-accent to-yellow-500 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50',
    outline: 'border-2 border-accent bg-transparent text-accent hover:bg-accent/10',
  }

  return (
    <Comp
      onClick={onClick}
      type={type}
      className={cn(
        `
        relative px-8 py-3 rounded-lg font-bold
        transform transition-all duration-300 hover:scale-105
        overflow-hidden group w-full text-center justify-center inline-flex items-center gap-2
      `,
        variantClasses[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center w-full gap-2">
         <div 
          className="
            absolute top-0 left-0 w-full h-full
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            transform -translate-x-full
            group-hover:translate-x-full transition-transform duration-700 ease-in-out
          "
        ></div>
        {children}
      </span>
    </Comp>
  );
};
