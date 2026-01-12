'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CustomPopoverProps {
  open: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export function CustomPopover({
  open,
  onClose,
  children,
  align = 'end',
  className,
}: CustomPopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !open.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const triggerRect = open.getBoundingClientRect();
    const content = contentRef.current;
    const contentRect = content.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = triggerRect.bottom + 4;
    let left = triggerRect.left;

    // Align horizontally
    if (align === 'end') {
      left = triggerRect.right - contentRect.width;
    } else if (align === 'center') {
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }

    // Adjust if off screen
    if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width - 8;
    }
    if (left < 8) {
      left = 8;
    }

    // Adjust if off bottom of screen
    if (top + contentRect.height > viewportHeight) {
      top = triggerRect.top - contentRect.height - 4;
    }

    content.style.top = `${top}px`;
    content.style.left = `${left}px`;
  }, [open, align]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ background: 'transparent' }}
      />
      
      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          'fixed z-50 w-48 rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md shadow-black/5',
          'animate-in fade-in-0 zoom-in-95 duration-100',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
}

