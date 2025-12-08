// CardSection.tsx
import React, { ReactNode } from 'react';

interface CardSectionProps {
  title: string;
  children: ReactNode;
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-slate-900">{title}</div>
      <div className="space-y-3 text-xs text-slate-700">{children}</div>
    </div>
  );
};
