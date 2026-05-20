import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'solid' | 'outline' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'solid', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-poppins uppercase tracking-wider rounded-md transition-all duration-300 flex items-center justify-center font-medium backdrop-blur-sm shadow-sm cursor-pointer';
  
  const variants = {
    solid: 'bg-primary text-black hover:bg-[#e8c547] border border-primary/50 shadow-[0_8px_28px_rgba(212,175,55,0.28)]',
    outline: 'border border-primary/80 text-primary hover:bg-primary hover:text-black',
    glass: 'bg-white/10 border border-primary/35 text-primary hover:bg-primary/20 hover:border-primary',
    ghost: 'text-primary hover:bg-primary/10 shadow-none backdrop-blur-none border-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
