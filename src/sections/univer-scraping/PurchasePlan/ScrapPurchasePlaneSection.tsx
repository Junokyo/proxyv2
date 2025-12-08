// UniversalScrapingPricingPage.tsx
import React from 'react';
import CommonPricingPage, {
  BottomSectionConfig,
  PricingPlan,
} from '@/sections/components/CommonPricingPage';

const scrapingPlans: PricingPlan[] = [
  {
    id: 'free-trial',
    title: 'Free trial',
    subTitle: "Don't miss out",
    priceMain: '$0',
    priceSuffix: '/1K results',
    billedText: '30-days free',
    ctaLabel: 'Start Free Trial',
    variant: 'dark',
  },
  {
    id: 'starter',
    title: 'Starter',
    priceMain: '$1.3',
    priceSuffix: '/1K results',
    billedText: '$10 Billed monthly',
    oldPriceText: '',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    priceMain: '$1.25',
    priceSuffix: '/1K results',
    oldPriceText: '$120',
    billedText: '$60 Billed monthly',
    badge: 'Save 50%',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
  {
    id: 'basic',
    title: 'Basic',
    priceMain: '$1.12',
    priceSuffix: '/1K results',
    oldPriceText: '$300',
    billedText: '$150 Billed monthly',
    badge: 'Save 50%',
    ctaLabel: 'Order Now',
    variant: 'featured',
  },
  {
    id: 'pro',
    title: 'Professional',
    priceMain: '$1.05',
    priceSuffix: '/1K results',
    oldPriceText: '$800',
    billedText: '$400 Billed monthly',
    badge: 'Save 50%',
    ctaLabel: 'Order Now',
    variant: 'standard',
  },
];

const scrapingBottom: BottomSectionConfig = {
  title: 'Enterprise',
  description:
    "Tailored to your business's unique needs, with priority support and personalized plans and pricing.",
  buttonLabel: 'Contact us',
  featuresColumns: [
    [
      'Customized data service',
      'No verification code',
      'Generate HTML and PNG results',
    ],
    [
      'Additional functions',
      'Geographic positioning',
      '24/7 technical support',
    ],
  ],
};

const PurchasePlaneSection: React.FC = () => {
  return (
    <CommonPricingPage
      title="Universal Scraping API"
      subTitle="Access a wide range of public websites at scale. Pay only for successful results"
      plans={scrapingPlans}
      bottomSection={scrapingBottom}
    />
  );
};

export default PurchasePlaneSection;
