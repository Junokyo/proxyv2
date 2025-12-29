import React from 'react';
import AccountSecurityCard from './AccountSecurityCard';
import MfaSecurityCard from './MfaSecurityCard';
import SecurityDeviceSection from './SecurityDeviceSection';

const SecuritySection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full space-y-4 md:space-y-5 lg:space-y-6">
        <AccountSecurityCard />
        <MfaSecurityCard />
        <SecurityDeviceSection />
      </div>
    </div>
  );
};

export default SecuritySection;
