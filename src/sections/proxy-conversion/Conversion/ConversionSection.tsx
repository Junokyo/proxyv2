// ConversionSection.tsx
import React, { useState } from 'react';
import ExchangeDetailsTable from './ExchangeDetailsTable';
import ConversionPanel, { PlanKey } from './ConversionPanel';

const ConversionSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('residential');

  return (
    <div className="w-full bg-slate-50">
      {/* padding responsive */}
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-6 lg:py-8 space-y-3 sm:space-y-4 md:space-y-6">
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

