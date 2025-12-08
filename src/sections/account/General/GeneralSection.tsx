import React from 'react';
import AccountSettingsSection from './AccountSettingSection';
import InvoiceSection from './InvoiceSection';

const GeneralSection: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full space-y-4 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Account settings */}
          <div className="md:col-span-6">
            <AccountSettingsSection />
          </div>

          {/* Invoice */}
          <div className="md:col-span-6">
            <InvoiceSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
