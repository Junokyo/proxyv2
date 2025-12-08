// ProxyExchangePage.tsx
import React, { useState } from 'react';
import ExchangeDetailsTable from './ExchangeDetailTable';
import RedeemSection, { PlanKey } from './RedeemSection';

const ExchangeSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('residential');

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* padding responsive */}
      <div className="w-full px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8 space-y-4 sm:space-y-6">
        {/* PHẦN REDEEM */}
        <RedeemSection
          selectedPlan={selectedPlan}
          onChangePlan={setSelectedPlan}
        />

        {/* PHẦN TABLE */}
        <ExchangeDetailsTable selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default ExchangeSection;
