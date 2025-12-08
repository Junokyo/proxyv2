// ProxyGeneratorLayout.tsx
import React, { ReactNode } from 'react';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export const ProxyGeneratorLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-2 md:px-5">
      <div className="space-y-4">{left}</div>
      <div>{right}</div>
    </div>
  );
};
