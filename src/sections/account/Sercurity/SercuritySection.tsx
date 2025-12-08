import React from 'react';
import AccountSecurityCard from './AccountSecurityCard';
import MfaSecurityCard from './MfaSecurityCard';
import SecurityDeviceSection from './SecurityDeviceSection';

const SecuritySection: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full space-y-4 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <AccountSecurityCard />
        <MfaSecurityCard />
        <SecurityDeviceSection />
      </div>
    </div>
  );
};

export default SecuritySection;
