// Mock data for Overview page - LunaProxy style

export interface ProxyType {
  id: string;
  value: string;
  label: string;
  icon: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  discount?: number;
  stats: {
    remainingTraffic: number;
    trafficUnit: string;
    expirationTime: string | null;
  };
}

export interface TrafficDataPoint {
  date: string;
  traffic: number;
  label: string;
}

// Proxy types data
export const PROXY_TYPES: ProxyType[] = [
  {
    id: 'residential',
    value: 'residential',
    label: 'Residential Proxies',
    icon: 'mdi:home-city-outline',
    price: 0.65,
    unit: '/GB',
    description:
      'Discover over 200M+ ethically sourced residential IPs for seamless human-like crawling. Access local public data effortlessly and without barriers.',
    features: [
      'HTTP/HTTPS/SOCKS5 protocols',
      'Unused GBs roll over',
      '99.9% fast response time',
      'Country and city-level targeting',
    ],
    discount: 80,
    stats: {
      remainingTraffic: 0,
      trafficUnit: 'GB',
      expirationTime: null,
    },
  },
  {
    id: 'unlimited',
    value: 'unlimited',
    label: 'Unlimited Proxies',
    icon: 'mdi:infinity',
    price: 60,
    unit: '/Day',
    description:
      'Unlimited bandwidth residential proxies for heavy data operations. Perfect for large-scale scraping and automation tasks.',
    features: [
      'Unlimited bandwidth',
      'Dedicated IP pools',
      'Auto-rotation available',
      'Premium support included',
    ],
    discount: 50,
    stats: {
      remainingTraffic: 0,
      trafficUnit: 'GB',
      expirationTime: null,
    },
  },
  {
    id: 'isp',
    value: 'isp',
    label: 'ISP Proxies',
    icon: 'mdi:home',
    price: 0.17,
    unit: '/IP/Day',
    description:
      'Static residential IPs from real ISPs. Ideal for accounts that require consistent IP addresses over extended periods.',
    features: [
      'Static IP addresses',
      'Real ISP networks',
      'High success rates',
      'Long session times',
    ],
    discount: 60,
    stats: {
      remainingTraffic: 0,
      trafficUnit: 'IP',
      expirationTime: null,
    },
  },
  {
    id: 'datacenter',
    value: 'datacenter',
    label: 'Datacenter Proxies',
    icon: 'mdi:office-building',
    price: 0.11,
    unit: '/IP/Day',
    description:
      'High-speed datacenter proxies for maximum performance. Best for non-geo-restricted content and high-volume requests.',
    features: [
      'Ultra-fast speeds',
      'Low latency',
      'Bulk pricing available',
      'API access included',
    ],
    discount: 70,
    stats: {
      remainingTraffic: 0,
      trafficUnit: 'IP',
      expirationTime: null,
    },
  },
  {
    id: 'rotating',
    value: 'rotating',
    label: 'Rotating ISP Proxies',
    icon: 'mdi:sync',
    price: 0.4,
    unit: '/GB',
    description:
      'Rotating ISP proxies that automatically change IPs. Perfect for avoiding rate limits and accessing geo-restricted content.',
    features: [
      'Auto IP rotation',
      'ISP-level authenticity',
      'Session control',
      'Global coverage',
    ],
    discount: 55,
    stats: {
      remainingTraffic: 0,
      trafficUnit: 'GB',
      expirationTime: null,
    },
  },
];

// Traffic chart data (last 30 days)
export const TRAFFIC_CHART_DATA: TrafficDataPoint[] = [
  { date: '2024-12-18', traffic: 0, label: 'Dec 18' },
  { date: '2024-12-19', traffic: 0, label: 'Dec 19' },
  { date: '2024-12-20', traffic: 0, label: 'Dec 20' },
  { date: '2024-12-21', traffic: 0, label: 'Dec 21' },
  { date: '2024-12-22', traffic: 0, label: 'Dec 22' },
  { date: '2024-12-23', traffic: 0, label: 'Dec 23' },
  { date: '2024-12-24', traffic: 0, label: 'Dec 24' },
  { date: '2024-12-25', traffic: 0, label: 'Dec 25' },
  { date: '2024-12-26', traffic: 0, label: 'Dec 26' },
  { date: '2024-12-27', traffic: 0, label: 'Dec 27' },
  { date: '2024-12-28', traffic: 0, label: 'Dec 28' },
  { date: '2024-12-29', traffic: 0, label: 'Dec 29' },
  { date: '2024-12-30', traffic: 0, label: 'Dec 30' },
  { date: '2024-12-31', traffic: 0, label: 'Dec 31' },
  { date: '2025-01-01', traffic: 0, label: 'Jan 1' },
  { date: '2025-01-02', traffic: 0, label: 'Jan 2' },
  { date: '2025-01-03', traffic: 0, label: 'Jan 3' },
  { date: '2025-01-04', traffic: 0, label: 'Jan 4' },
  { date: '2025-01-05', traffic: 0, label: 'Jan 5' },
  { date: '2025-01-06', traffic: 0, label: 'Jan 6' },
  { date: '2025-01-07', traffic: 0, label: 'Jan 7' },
  { date: '2025-01-08', traffic: 0, label: 'Jan 8' },
  { date: '2025-01-09', traffic: 0, label: 'Jan 9' },
  { date: '2025-01-10', traffic: 0, label: 'Jan 10' },
  { date: '2025-01-11', traffic: 0, label: 'Jan 11' },
  { date: '2025-01-12', traffic: 0, label: 'Jan 12' },
  { date: '2025-01-13', traffic: 0, label: 'Jan 13' },
  { date: '2025-01-14', traffic: 0, label: 'Jan 14' },
  { date: '2025-01-15', traffic: 0, label: 'Jan 15' },
  { date: '2025-01-16', traffic: 0, label: 'Jan 16' },
  { date: '2025-01-17', traffic: 0, label: 'Jan 17' },
];

// Sidebar data
export const AFFILIATE_DATA = {
  invitationCode: '64N6W5I7',
  invitationLink: 'https://www.proxy.forlike.pro/ref/',
  commission: 10,
  withdrawable: 0,
};

// Main tabs
export const MAIN_TABS = [
  { value: 'proxies', label: 'Proxies' },
  { value: 'scraping', label: 'Universal Scraping API', badge: 'Free Trial' },
];
