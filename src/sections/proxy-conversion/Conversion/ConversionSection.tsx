// ConversionSection.tsx
import React, { useState } from 'react';
import ExchangeDetailsTable from './ExchangeDetailsTable';
import ConversionPanel, { PlanKey } from './ConversionPanel';

const ConversionSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('residential');

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* padding responsive */}
      <div className="w-full px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8 space-y-4 sm:space-y-6">
        {/* PHẦN QUI ĐỔI */}
        <ConversionPanel
          selectedPlan={selectedPlan}
          onChangePlan={setSelectedPlan}
        />

        {/* PHẦN TABLE EXCHANGE DETAILS */}
        <ExchangeDetailsTable selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default ConversionSection;

