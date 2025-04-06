
import React from 'react';
import { cn } from '@/lib/utils';

interface CardStackProps {
  children: React.ReactNode;
  className?: string;
}

export function CardStack({ children, className }: CardStackProps) {
  return (
    <div className={cn('card-stack', className)}>
      {children}
    </div>
  );
}

export function CardStackHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-serif font-medium text-foreground mb-3">
      {children}
    </h2>
  );
}

export function CardStackContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('flex flex-col gap-4 mb-8', className)}>
      {children}
    </div>
  );
}
