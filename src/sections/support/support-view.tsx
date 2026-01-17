'use client';

import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Contact Channels Data - Updated design
const CONTACT_CHANNELS = [
  {
    id: 'zalo',
    name: 'Zalo',
    icon: 'mdi:message-outline',
    bgColor: 'bg-sky-100',
    iconColor: 'text-sky-500',
    iconBgColor: 'bg-sky-100',
    value: '0909 123 456',
    responseTime: '< 5 phút',
    link: 'https://zalo.me/0909123456',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'mdi:telegram',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-blue-100',
    value: '@forlike_support',
    responseTime: '< 10 phút',
    link: 'https://t.me/forlike_support',
  },
  {
    id: 'hotline',
    name: 'Hotline',
    icon: 'mdi:phone',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    iconBgColor: 'bg-emerald-100',
    value: '0909 123 456',
    responseTime: 'Ngay lập tức',
    link: 'tel:0909123456',
  },
  {
    id: 'email',
    name: 'Email',
    icon: 'mdi:email-outline',
    bgColor: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-500',
    iconBgColor: 'bg-fuchsia-100',
    value: 'support@forlike.vn',
    responseTime: '< 2 giờ',
    link: 'mailto:support@forlike.vn',
  },
];

// Support tips
const SUPPORT_TIPS = [
  { text: 'Zalo & Telegram - Phản hồi nhanh nhất trong giờ làm việc' },
  { text: 'Hotline - Dành cho vấn đề khẩn cấp cần xử lý ngay' },
  { text: 'Email - Phù hợp cho yêu cầu phức tạp cần giải thích chi tiết' },
];

// FAQ Data
const FAQ_DATA = [
  {
    category: 'Use Cases',
    icon: 'mdi:target',
    items: [
      {
        question: 'What can I use proxies for?',
        answer: `Our proxies support:
• Automation - Automate repetitive tasks
• Data Crawling - Web scraping and data collection
• Multi-accounting - Manage multiple accounts
• System Testing - Test from different locations`,
      },
      {
        question: 'What are prohibited use cases?',
        answer: `We DO NOT support and will terminate accounts for:
• Hacking or unauthorized access
• Email/message spam
• Financial fraud
• Brute force attacks
• Illegal activities`,
      },
    ],
  },
  {
    category: 'Basic Knowledge',
    icon: 'mdi:book-open-page-variant-outline',
    items: [
      {
        question: 'What is HTTP/HTTPS Proxy?',
        answer: `HTTP/HTTPS Proxy is the most common type, operating at the application layer:
• HTTP: For non-encrypted websites
• HTTPS: Supports SSL, more secure
• Fast speed, ideal for web browsing and APIs`,
      },
      {
        question: 'What is SOCKS5?',
        answer: `SOCKS5 is a lower-level proxy protocol:
• Supports various traffic types (HTTP, FTP, SMTP...)
• Protocol agnostic
• Suitable for specialized applications
• May be slightly slower than HTTP proxies`,
      },
      {
        question: 'Differences between proxy types?',
        answer: `• Residential Proxy: Real ISP IPs, high trust
• Datacenter Proxy: Server IPs, fast, cost-effective
• ISP Proxy: Best of both worlds
• Rotating Proxy: Auto-rotating IPs per session`,
      },
    ],
  },
  {
    category: 'Configuration Guides',
    icon: 'mdi:cog-outline',
    items: [
      {
        question: 'Browser Configuration (Chrome, Firefox)',
        answer: `Chrome:
1. Settings → Advanced → System → Open proxy settings
2. Enter host:port and username:password
3. Save

Firefox:
1. Settings → Network Settings → Manual proxy configuration
2. Enter proxy information
3. Check "Use this proxy for all protocols"`,
      },
      {
        question: 'Python Configuration',
        answer: `import requests

proxies = {
    'http': 'http://username:password@host:port',
    'https': 'http://username:password@host:port',
}

response = requests.get('https://api.ipify.org', proxies=proxies)
print(response.text)`,
      },
      {
        question: 'Node.js Configuration',
        answer: `const axios = require('axios');

const proxy = {
    host: 'your-proxy-host',
    port: 8080,
    auth: {
        username: 'username',
        password: 'password'
    }
};

axios.get('https://api.ipify.org', { proxy })
    .then(response => console.log(response.data));`,
      },
    ],
  },
  {
    category: 'Troubleshooting',
    icon: 'mdi:alert-circle-outline',
    items: [
      {
        question: 'Proxy not connecting / Dead proxy',
        answer: `Check:
• Is username/password correct?
• Is your IP whitelisted?
• Is the proxy still valid?
• Try switching to another proxy in your list`,
      },
      {
        question: 'Connection timeout',
        answer: `Solutions:
• Increase timeout in your code (at least 30s)
• Check your network connection
• Try a different proxy
• Contact support if issue persists`,
      },
      {
        question: 'Getting blocked by websites',
        answer: `Possible causes:
• Website blocks datacenter IPs → Use residential proxies
• Requests too fast → Add delays between requests
• Invalid user-agent → Use real browser user-agent
• Cookie/session issues → Clear cookies and retry`,
      },
    ],
  },
  {
    category: 'Policies',
    icon: 'mdi:file-document-outline',
    items: [
      {
        question: 'IP Change Policy',
        answer: `• Residential Proxy: Rotates per session, unlimited
• Static Proxy: 1 free change within first 24h
• ISP Proxy: Contact support to change
• Rotating Proxy: Auto-rotates, no request needed`,
      },
      {
        question: 'Refund Policy',
        answer: `100% refund if:
• Proxy doesn't work within first 24h
• Uptime less than 95%
• No refund for: misuse, TOS violations

Processing time: 3-7 business days`,
      },
      {
        question: 'Warranty Policy',
        answer: `• Free warranty during subscription period
• No warranty for: configuration errors, target site blocks
• Free IP replacement if proxy dies (within validity)`,
      },
    ],
  },
];

// System Status
const SYSTEM_STATUS = [
  { name: 'Residential Proxies', status: 'operational', region: 'Global' },
  { name: 'Datacenter Proxies - US', status: 'operational', region: 'US' },
  { name: 'Datacenter Proxies - EU', status: 'degraded', region: 'EU' },
  { name: 'ISP Proxies', status: 'operational', region: 'Global' },
  { name: 'API Service', status: 'operational', region: 'Global' },
];

// Report Requirements
const REPORT_REQUIREMENTS = [
  {
    icon: 'mdi:account-outline',
    label: 'Username or Order ID',
    required: true,
  },
  {
    icon: 'mdi:ip-network-outline',
    label: 'Proxy IP with issue',
    required: true,
  },
  {
    icon: 'mdi:clock-outline',
    label: 'Time of occurrence',
    required: true,
  },
  {
    icon: 'mdi:web',
    label: 'Website / service being accessed',
    required: true,
  },
];

// Ticket Types
type TicketStatus =
  | 'pending'
  | 'processing'
  | 'resolved'
  | 'rejected'
  | 'review_requested';
type TicketCategory =
  | 'technical'
  | 'ip-change'
  | 'refund'
  | 'billing'
  | 'account'
  | 'other';

interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  resolutionNote?: string;
}

const CATEGORY_LABELS: Record<TicketCategory, string> = {
  technical: 'Technical Issue / Proxy Not Working',
  'ip-change': 'IP Change Request',
  refund: 'Refund Request',
  billing: 'Billing Issue',
  account: 'Account Issue',
  other: 'Other',
};

// Stats data
const SUPPORT_STATS = [
  {
    label: 'Tổng ticket',
    value: '12',
    icon: 'mdi:ticket-outline',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Đang xử lý',
    value: '2',
    icon: 'mdi:progress-clock',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Đã giải quyết',
    value: '10',
    icon: 'mdi:check-circle-outline',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Hỗ trợ online',
    value: '24/7',
    icon: 'mdi:headset',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

const TAB_ITEMS = [
  { value: 'contact', label: 'Contact', icon: 'mdi:message-text-outline' },
  { value: 'faq', label: 'FAQ', icon: 'mdi:frequently-asked-questions' },
  { value: 'status', label: 'System Status', icon: 'mdi:server-outline' },
  { value: 'report', label: 'Report Issue', icon: 'mdi:alert-outline' },
  { value: 'tickets', label: 'My Tickets', icon: 'mdi:ticket-outline' },
];

export default function SupportView() {
  const [activeSection, setActiveSection] = useState('contact');
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewReason, setReviewReason] = useState('');
  const [ticketFormData, setTicketFormData] = useState({
    subject: '',
    category: '',
    description: '',
  });

  // Mock tickets data - in real app, this would come from API
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT-001',
      subject: 'Proxy connection failed',
      category: 'technical',
      description:
        'My proxy has not been connecting since this morning. Tried multiple times but still getting errors.',
      status: 'resolved',
      createdAt: '2024-01-15 09:30',
      updatedAt: '2024-01-15 14:20',
      resolutionNote: 'Checked and replaced with new proxy. Please try again.',
    },
    {
      id: 'TKT-002',
      subject: 'IP Change Request',
      category: 'ip-change',
      description: 'Need to change IP for proxy #12345',
      status: 'processing',
      createdAt: '2024-01-16 10:15',
      updatedAt: '2024-01-16 10:15',
    },
    {
      id: 'TKT-003',
      subject: 'Refund Request',
      category: 'refund',
      description: 'Proxy did not work within first 24h, requesting refund',
      status: 'rejected',
      createdAt: '2024-01-14 08:00',
      updatedAt: '2024-01-14 16:30',
      rejectionReason:
        'Proxy was working normally after investigation. Does not meet refund criteria.',
    },
    {
      id: 'TKT-004',
      subject: 'Timeout errors during crawling',
      category: 'technical',
      description: 'Getting timeout errors when using proxy for data crawling',
      status: 'pending',
      createdAt: '2024-01-17 11:00',
      updatedAt: '2024-01-17 11:00',
    },
  ]);

  // Computed stats
  const ticketStats = useMemo(() => {
    const pending = tickets.filter((t) => t.status === 'pending').length;
    const processing = tickets.filter((t) => t.status === 'processing').length;
    const resolved = tickets.filter((t) => t.status === 'resolved').length;
    return { pending, processing, resolved, total: tickets.length };
  }, [tickets]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-teal-600 bg-teal-50';
      case 'degraded':
        return 'text-amber-600 bg-amber-50';
      case 'outage':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return 'mdi:check-circle';
      case 'degraded':
        return 'mdi:alert';
      case 'outage':
        return 'mdi:close-circle';
      default:
        return 'mdi:help-circle';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketFormData.subject,
      category: ticketFormData.category as TicketCategory,
      description: ticketFormData.description,
      status: 'pending',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      updatedAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTickets((prev) => [newTicket, ...prev]);
    setIsTicketDialogOpen(false);

    toast.success('Ticket submitted successfully!', {
      description: `Ticket ID: ${newTicket.id}. We will respond as soon as possible.`,
      duration: 5000,
    });

    setTicketFormData({
      subject: '',
      category: '',
      description: '',
    });
  };

  const handleViewTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };

  const handleRequestReview = () => {
    if (!selectedTicket || !reviewReason.trim()) {
      toast.error('Please provide a reason for your review request');
      return;
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id
          ? { ...ticket, status: 'review_requested' as TicketStatus }
          : ticket,
      ),
    );

    toast.success('Review request submitted!', {
      description: 'We will re-examine your ticket.',
      duration: 5000,
    });

    setIsReviewDialogOpen(false);
    setReviewReason('');
    setIsTicketDetailOpen(false);
    setSelectedTicket(null);
  };

  const getTicketStatusBadge = (status: TicketStatus) => {
    const statusConfig = {
      pending: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        icon: 'mdi:clock-outline',
        label: 'Pending',
      },
      processing: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: 'mdi:autorenew',
        label: 'Processing',
      },
      resolved: {
        bg: 'bg-teal-50',
        text: 'text-teal-700',
        icon: 'mdi:check-circle',
        label: 'Resolved',
      },
      rejected: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: 'mdi:close-circle',
        label: 'Rejected',
      },
      review_requested: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: 'mdi:refresh',
        label: 'Review Requested',
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-2.5 py-1 text-xs font-medium ${config.text}`}
      >
        <Icon icon={config.icon} className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  const handleTicketFormChange = (field: string, value: string) => {
    setTicketFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Support Center</h1>
        <p className="mt-1 text-sm text-slate-500">
          Get help with your proxy services
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUPPORT_STATS.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <Icon icon={stat.icon} className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex items-center gap-1 overflow-x-auto pb-px scrollbar-hide">
          {TAB_ITEMS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveSection(tab.value)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeSection === tab.value
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon icon={tab.icon} className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Channels Section */}
      {activeSection === 'contact' && (
        <div className="space-y-6">
          {/* Contact Channels Card */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500">
                  <Icon icon="mdi:message-text-outline" className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Kênh liên hệ</h3>
              </div>
              <button
                onClick={() => setIsTicketDialogOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Gửi ticket
                <Icon icon="mdi:arrow-right" className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {CONTACT_CHANNELS.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-center"
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${channel.iconBgColor} mb-3`}
                    >
                      <Icon
                        icon={channel.icon}
                        className={`h-7 w-7 ${channel.iconColor}`}
                      />
                    </div>

                    {/* Name with link icon */}
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm font-semibold text-slate-900">
                        {channel.name}
                      </span>
                      <Icon icon="mdi:open-in-new" className="h-3.5 w-3.5 text-slate-400" />
                    </div>

                    {/* Contact value */}
                    <p className="text-sm text-slate-600 mb-2">{channel.value}</p>

                    {/* Response time */}
                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                      <Icon icon="mdi:clock-outline" className="h-3.5 w-3.5" />
                      <span>{channel.responseTime}</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 shrink-0">
                  <Icon icon="mdi:sparkles" className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Mẹo để được hỗ trợ nhanh
                  </h4>
                  <ul className="space-y-1.5">
                    {SUPPORT_TIPS.map((tip, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <div className="space-y-4">
          {/* Search hint */}
          <Card className="border-0 bg-blue-50 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <Icon icon="mdi:lightbulb-outline" className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Tip:</span> Browse the FAQ before contacting support - save time for both of us!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          {FAQ_DATA.map((category, idx) => (
            <Card
              key={idx}
              className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <CardHeader className="bg-slate-50 p-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Icon icon={category.icon} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{category.category}</h3>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIdx) => (
                    <AccordionItem key={itemIdx} value={`item-${idx}-${itemIdx}`}>
                      <AccordionTrigger className="text-left hover:no-underline py-3 text-sm font-medium text-slate-700 hover:text-slate-900">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-lg leading-relaxed">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* System Status Section */}
      {activeSection === 'status' && (
        <div className="space-y-4">
          {/* Overall Status Banner */}
          <Card className="border-0 bg-teal-50 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100">
                  <Icon icon="mdi:check-circle" className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-teal-800">
                    All Systems Operational
                  </h4>
                  <p className="text-sm text-teal-700">
                    Major incidents will be posted on our Telegram Channel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status List */}
          <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
            <CardHeader className="bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Service Status</h3>
                <span className="text-xs text-slate-500">Real-time updates</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {SYSTEM_STATUS.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={getStatusIcon(service.status)}
                        className={`h-5 w-5 ${
                          service.status === 'operational'
                            ? 'text-teal-600'
                            : service.status === 'degraded'
                              ? 'text-amber-600'
                              : 'text-red-600'
                        }`}
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {service.name}
                        </div>
                        <div className="text-xs text-slate-500">{service.region}</div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(service.status)}`}
                    >
                      {getStatusText(service.status)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Issue Section */}
      {activeSection === 'report' && (
        <div className="space-y-4">
          {/* Notice */}
          <Card className="border-0 bg-red-50 shadow-none">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                  <Icon icon="mdi:alert-outline" className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-800 mb-1">
                    Reporting Guidelines (Required)
                  </h4>
                  <p className="text-sm text-red-700">
                    To receive fast support, please provide complete information. Missing information will delay processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Information */}
          <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="p-4 pb-3">
              <h3 className="font-semibold text-slate-900">Required Information</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REPORT_REQUIREMENTS.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                      <Icon icon={req.icon} className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {req.label}
                      {req.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* No Warranty Cases */}
          <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="p-4 pb-3">
              <h3 className="font-semibold text-slate-900">Not Covered by Warranty</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {[
                  'Proxy misuse (hacking, spam, fraud...)',
                  'Tool or script misconfiguration',
                  'Target website blocking',
                  'Incomplete information when reporting',
                  'Terms of Service violations',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon icon="mdi:close-circle" className="h-4 w-4 text-red-500" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              className="flex-1 h-11 gap-2"
              onClick={() => window.open('https://t.me/YourSupportBot', '_blank')}
            >
              <Icon icon="mdi:telegram" className="h-5 w-5" />
              Contact via Telegram
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 gap-2"
              onClick={() => setIsTicketDialogOpen(true)}
            >
              <Icon icon="mdi:ticket-outline" className="h-5 w-5" />
              Create Ticket
            </Button>
          </div>
        </div>
      )}

      {/* My Tickets Section */}
      {activeSection === 'tickets' && (
        <div className="space-y-4">
          {/* Ticket Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-900">{ticketStats.total}</div>
                <div className="text-xs text-slate-500">Total Tickets</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{ticketStats.pending}</div>
                <div className="text-xs text-slate-500">Pending</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{ticketStats.processing}</div>
                <div className="text-xs text-slate-500">Processing</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-teal-600">{ticketStats.resolved}</div>
                <div className="text-xs text-slate-500">Resolved</div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <Card className="border-0 bg-blue-50 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <Icon icon="mdi:information-outline" className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-blue-700">
                  View all your submitted tickets and their status. You can request a review for rejected or unsatisfactory resolutions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket List */}
          {tickets.length === 0 ? (
            <Card className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto mb-4">
                  <Icon icon="mdi:ticket-outline" className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  No tickets yet
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  You haven't submitted any tickets. Create a new ticket to get support.
                </p>
                <Button variant="primary" onClick={() => setIsTicketDialogOpen(true)}>
                  <Icon icon="mdi:plus" className="h-4 w-4 mr-2" />
                  Create New Ticket
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {ticket.subject}
                          </h3>
                          {getTicketStatusBadge(ticket.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:tag-outline" className="h-3.5 w-3.5" />
                            {CATEGORY_LABELS[ticket.category]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:pound" className="h-3.5 w-3.5" />
                            {ticket.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:clock-outline" className="h-3.5 w-3.5" />
                            {ticket.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {ticket.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => handleViewTicketDetail(ticket)}
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-initial h-9"
                      >
                        <Icon icon="mdi:eye-outline" className="h-4 w-4 mr-1.5" />
                        View Details
                      </Button>
                      {(ticket.status === 'rejected' || ticket.status === 'resolved') && (
                        <Button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setIsReviewDialogOpen(true);
                          }}
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-initial h-9"
                        >
                          <Icon icon="mdi:refresh" className="h-4 w-4 mr-1.5" />
                          Request Review
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Add New Ticket Button */}
          {tickets.length > 0 && (
            <div className="flex justify-center">
              <Button variant="primary" onClick={() => setIsTicketDialogOpen(true)}>
                <Icon icon="mdi:plus" className="h-4 w-4 mr-2" />
                Create New Ticket
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Create Ticket Dialog */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto
                     sm:max-h-[85vh]
                     bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0
                     sm:left-[50%] sm:top-[50%]
                     sm:translate-x-[-50%] sm:translate-y-[-50%]
                     sm:bottom-auto sm:right-auto
                     rounded-t-2xl sm:rounded-xl
                     p-0 border-0 sm:border shadow-xl"
        >
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          <DialogHeader className="px-5 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Create Support Ticket
            </DialogTitle>
            <p className="text-sm text-slate-500 mt-1">
              Please provide detailed information so we can assist you effectively
            </p>
          </DialogHeader>
          <DialogBody className="px-5 sm:px-6 py-5">
            <form onSubmit={handleTicketSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Brief description of your issue"
                  value={ticketFormData.subject}
                  onChange={(e) => handleTicketFormChange('subject', e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ticketFormData.category}
                  onValueChange={(value) => handleTicketFormChange('category', value)}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue / Proxy Not Working</SelectItem>
                    <SelectItem value="ip-change">IP Change Request</SelectItem>
                    <SelectItem value="refund">Refund Request</SelectItem>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe your issue in detail. Please include: Username/Order ID, Proxy IP (if applicable), time of occurrence, website/service being accessed."
                  value={ticketFormData.description}
                  onChange={(e) => handleTicketFormChange('description', e.target.value)}
                  rows={5}
                  required
                  className="w-full resize-none"
                />
                <p className="text-xs text-slate-500">
                  The more details you provide, the faster we can help you.
                </p>
              </div>

              <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4 border-t border-slate-100">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full sm:w-auto h-10">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" className="w-full sm:w-auto h-10">
                  Submit Ticket
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Dialog */}
      <Dialog open={isTicketDetailOpen} onOpenChange={setIsTicketDetailOpen}>
        <DialogContent
          className="max-w-3xl w-full max-h-[90vh] overflow-y-auto
                     sm:max-h-[85vh]
                     bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0
                     sm:left-[50%] sm:top-[50%]
                     sm:translate-x-[-50%] sm:translate-y-[-50%]
                     sm:bottom-auto sm:right-auto
                     rounded-t-2xl sm:rounded-xl
                     p-0 border-0 sm:border shadow-xl"
        >
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          {selectedTicket && (
            <>
              <DialogHeader className="px-5 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-lg font-semibold text-slate-900 mb-2">
                      {selectedTicket.subject}
                    </DialogTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      {getTicketStatusBadge(selectedTicket.status)}
                      <span className="text-xs text-slate-500 font-medium">
                        {selectedTicket.id}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogBody className="px-5 sm:px-6 py-5">
                <div className="space-y-5">
                  {/* Ticket Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-slate-500 mb-1">Issue Type</div>
                      <div className="text-sm font-medium text-slate-900">
                        {CATEGORY_LABELS[selectedTicket.category]}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-slate-500 mb-1">Created</div>
                      <div className="text-sm font-medium text-slate-900">
                        {selectedTicket.createdAt}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-slate-500 mb-1">Last Updated</div>
                      <div className="text-sm font-medium text-slate-900">
                        {selectedTicket.updatedAt}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Description
                    </div>
                    <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
                      {selectedTicket.description}
                    </div>
                  </div>

                  {/* Rejection Reason */}
                  {selectedTicket.status === 'rejected' && selectedTicket.rejectionReason && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-red-600 uppercase tracking-wide mb-2">
                        <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                        Rejection Reason
                      </div>
                      <div className="text-sm text-slate-700 bg-red-50 border border-red-100 p-4 rounded-lg leading-relaxed">
                        {selectedTicket.rejectionReason}
                      </div>
                    </div>
                  )}

                  {/* Resolution Note */}
                  {selectedTicket.status === 'resolved' && selectedTicket.resolutionNote && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-teal-600 uppercase tracking-wide mb-2">
                        <Icon icon="mdi:check-circle" className="h-4 w-4" />
                        Resolution Note
                      </div>
                      <div className="text-sm text-slate-700 bg-teal-50 border border-teal-100 p-4 rounded-lg leading-relaxed">
                        {selectedTicket.resolutionNote}
                      </div>
                    </div>
                  )}
                </div>
              </DialogBody>
              <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4 px-5 sm:px-6 pb-5 border-t border-slate-100">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full sm:w-auto h-10">
                    Close
                  </Button>
                </DialogClose>
                {(selectedTicket.status === 'rejected' || selectedTicket.status === 'resolved') && (
                  <Button
                    onClick={() => {
                      setIsTicketDetailOpen(false);
                      setIsReviewDialogOpen(true);
                    }}
                    variant="primary"
                    className="w-full sm:w-auto h-10"
                  >
                    <Icon icon="mdi:refresh" className="h-4 w-4 mr-2" />
                    Request Review
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto
                     sm:max-h-[85vh]
                     bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0
                     sm:left-[50%] sm:top-[50%]
                     sm:translate-x-[-50%] sm:translate-y-[-50%]
                     sm:bottom-auto sm:right-auto
                     rounded-t-2xl sm:rounded-xl
                     p-0 border-0 sm:border shadow-xl"
        >
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          <DialogHeader className="px-5 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Request Ticket Review
            </DialogTitle>
            <p className="text-sm text-slate-500 mt-1">
              Please explain why you would like this ticket to be reviewed
            </p>
          </DialogHeader>
          <DialogBody className="px-5 sm:px-6 py-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestReview();
              }}
              className="space-y-5"
            >
              {selectedTicket && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xs font-medium text-slate-500 mb-1">Ticket</div>
                  <div className="text-sm font-semibold text-slate-900 mb-0.5">
                    {selectedTicket.subject}
                  </div>
                  <div className="text-xs text-slate-500">{selectedTicket.id}</div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Reason for Review <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Explain why you believe this ticket should be reviewed again..."
                  value={reviewReason}
                  onChange={(e) => setReviewReason(e.target.value)}
                  rows={5}
                  required
                  className="w-full resize-none"
                />
                <p className="text-xs text-slate-500">
                  Please provide detailed information so we can properly re-evaluate your ticket.
                </p>
              </div>

              <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4 border-t border-slate-100">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto h-10"
                    onClick={() => setReviewReason('')}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" className="w-full sm:w-auto h-10">
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
