import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { FADE_UP } from '../../../motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'default' | 'outline';
  children: React.ReactNode;
}

export default function Card({ variant = 'glass', children, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-xl p-6 md:p-10 transition-all';
  const variants = {
    glass: 'bg-white/5 border border-primary/35 shadow-[0_16px_42px_rgba(0,0,0,0.5)] backdrop-blur-md',
    default: 'bg-black/55 border border-primary/30 shadow-[0_14px_36px_rgba(0,0,0,0.45)]',
    outline: 'border border-primary/40 bg-transparent shadow-none',
  };

  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
