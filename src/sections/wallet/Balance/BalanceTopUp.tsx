// TopUpPage.tsx
import React, { useState } from 'react';
import { TopUpLeft } from './BalanceTopUpLeft';
import { TopUpRight } from './BalanceTopUpRight';

const TopUpPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);

  return (
    <div className="">
      {/* <div className="mx-auto max-w-6xl"> */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TopUpLeft amount={amount} onChangeAmount={setAmount} />
        </div>

        <div className="lg:col-span-1">
          <TopUpRight amount={amount} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default TopUpPage;
