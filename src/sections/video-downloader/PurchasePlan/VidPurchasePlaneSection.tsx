// VideoDataPricingPage.tsx
import React from 'react';
import CommonPricingPage, {
  BottomSectionConfig,
  PricingPlan,
} from '@/sections/components/CommonPricingPage';

const videoPlans: PricingPlan[] = [
  {
    id: '500gb',
    title: '500 GB',
    priceMain: '$0.12',
    priceSuffix: '/GB',
    oldPriceText: '$0.15',
    billedText: '$60 Billed monthly',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
  {
    id: '5tb',
    title: '5 TB',
    priceMain: '$0.1',
    priceSuffix: '/GB',
    oldPriceText: '$0.12',
    billedText: '$500 Billed monthly',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
  {
    id: '20tb',
    title: '20 TB',
    priceMain: '$0.09',
    priceSuffix: '/GB',
    oldPriceText: '$0.1',
    billedText: '$1800 Billed monthly',
    ctaLabel: 'Order Now',
    badge: 'Popular',
    variant: 'featured',
  },
  {
    id: '100tb',
    title: '100 TB',
    priceMain: '$0.07',
    priceSuffix: '/GB',
    oldPriceText: '$0.08',
    billedText: '$7000 Billed monthly',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
  {
    id: 'custom',
    title: 'Custom',
    subTitle: 'Get a quote',
    priceMain: '',
    ctaLabel: 'Contact Us',
    variant: 'standard',
  },
];

const videoBottom: BottomSectionConfig = {
  title: 'With no additional fees & included in the price:',
  description: '',
  featuresColumns: [
    ['Original quality', 'No watermark'],
    ['Batch download', 'High speed and stability'],
  ],
};

const VidPurchasePlaneSection: React.FC = () => {
  return (
    <CommonPricingPage
      title="Video Data API"
      subTitle="Automatically collect high-quality video data in batches to train your AI model"
      plans={videoPlans}
      bottomSection={videoBottom}
    />
  );
};

export default VidPurchasePlaneSection;
