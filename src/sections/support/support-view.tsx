'use client';

import { useState } from 'react';
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

// Contact Channels Data
const CONTACT_CHANNELS = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'mdi:telegram',
    color: 'from-blue-500 to-blue-600',
    priority: 'Ưu tiên',
    items: [
      {
        label: 'Live Chat',
        value: '@YourSupportBot',
        description: 'Hỗ trợ trực tiếp, phản hồi nhanh',
        link: 'https://t.me/YourSupportBot',
      },
      {
        label: 'Group hỗ trợ',
        value: '@YourSupportGroup',
        description: 'Hỏi đáp, chia sẻ lỗi thường gặp',
        link: 'https://t.me/YourSupportGroup',
      },
      {
        label: 'Channel thông báo',
        value: '@YourChannel',
        description: 'Cập nhật sự cố, bảo trì',
        link: 'https://t.me/YourChannel',
      },
    ],
    responseTime: '5–30 phút',
    workingHours: 'UTC+7 (09:00 – 23:00)',
  },
  {
    id: 'ticket',
    name: 'Ticket System',
    icon: 'mdi:ticket',
    color: 'from-purple-500 to-purple-600',
    description: 'Dùng khi cần xử lý kỹ, theo dõi tiến độ rõ ràng',
    items: [
      {
        label: 'Khuyến nghị',
        value: 'Lỗi kỹ thuật, đổi IP, hoàn tiền',
      },
    ],
    statuses: ['Open', 'Processing', 'Resolved'],
  },
  {
    id: 'email',
    name: 'Email hỗ trợ',
    icon: 'mdi:email',
    color: 'from-green-500 to-green-600',
    email: 'support@yourproxy.com',
    description: 'Telegram không liên hệ được hoặc các vấn đề nghiêm túc',
    responseTime: 'Trong vòng 24h',
  },
];

// FAQ Data
const FAQ_DATA = [
  {
    category: 'Mục đích sử dụng',
    icon: 'mdi:target',
    items: [
      {
        question: 'Proxy dùng cho mục đích gì?',
        answer: `Proxy của chúng tôi hỗ trợ:
• Automation - Tự động hóa các tác vụ
• Crawl dữ liệu - Thu thập thông tin
• Quản lý nhiều tài khoản - Multi-accounting
• Test hệ thống - Kiểm tra từ nhiều vị trí địa lý`,
      },
      {
        question: 'Proxy KHÔNG được dùng cho mục đích nào?',
        answer: `Chúng tôi KHÔNG hỗ trợ và sẽ khóa tài khoản nếu phát hiện:
• Hack, xâm nhập trái phép
• Spam email/message
• Fraud - Lừa đảo tài chính
• Brute force attack
• Hoạt động vi phạm pháp luật`,
      },
    ],
  },
  {
    category: 'Kiến thức cơ bản',
    icon: 'mdi:book-open',
    items: [
      {
        question: 'HTTP / HTTPS Proxy là gì?',
        answer: `HTTP/HTTPS Proxy là loại proxy phổ biến nhất, hoạt động ở tầng ứng dụng:
• HTTP: Dùng cho các trang web không mã hóa
• HTTPS: Hỗ trợ SSL, an toàn hơn
• Tốc độ nhanh, phù hợp với web browsing và API`,
      },
      {
        question: 'SOCKS5 là gì?',
        answer: `SOCKS5 là giao thức proxy hoạt động ở tầng thấp hơn:
• Hỗ trợ nhiều loại traffic (HTTP, FTP, SMTP...)
• Không giới hạn giao thức
• Phù hợp với các ứng dụng đặc thủ
• Tốc độ có thể chậm hơn HTTP proxy`,
      },
      {
        question: 'Khác nhau giữa các loại proxy?',
        answer: `• Residential Proxy: IP từ ISP thật, độ tin cậy cao
• Datacenter Proxy: IP từ server, tốc độ nhanh, giá rẻ
• ISP Proxy: Kết hợp ưu điểm của cả hai
• Rotating Proxy: IP tự động đổi theo session`,
      },
    ],
  },
  {
    category: 'Hướng dẫn cấu hình',
    icon: 'mdi:cog',
    items: [
      {
        question: 'Cấu hình trên trình duyệt (Chrome, Firefox)',
        answer: `Chrome:
1. Settings → Advanced → System → Open proxy settings
2. Nhập host:port và username:password
3. Save

Firefox:
1. Settings → Network Settings → Manual proxy configuration
2. Nhập thông tin proxy
3. Tick "Use this proxy for all protocols"`,
      },
      {
        question: 'Cấu hình với Python',
        answer: `import requests

proxies = {
    'http': 'http://username:password@host:port',
    'https': 'http://username:password@host:port',
}

response = requests.get('https://api.ipify.org', proxies=proxies)
print(response.text)`,
      },
      {
        question: 'Cấu hình với Node.js',
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
    category: 'Lỗi thường gặp',
    icon: 'mdi:alert-circle',
    items: [
      {
        question: 'Proxy die / không kết nối được',
        answer: `Kiểm tra:
• Username/password có đúng không?
• IP của bạn đã được whitelist chưa?
• Proxy còn hạn sử dụng không?
• Thử đổi sang proxy khác trong danh sách`,
      },
      {
        question: 'Timeout khi kết nối',
        answer: `Giải pháp:
• Tăng timeout trong code (ít nhất 30s)
• Kiểm tra network của bạn
• Thử proxy khác
• Liên hệ hỗ trợ nếu vẫn lỗi`,
      },
      {
        question: 'Bị website block',
        answer: `Nguyên nhân có thể:
• Website chặn datacenter IP → Dùng residential proxy
• Request quá nhanh → Thêm delay giữa các request
• User-agent không hợp lệ → Dùng user-agent thật
• Cookie/session issue → Xóa cookie và thử lại`,
      },
    ],
  },
  {
    category: 'Chính sách',
    icon: 'mdi:file-document',
    items: [
      {
        question: 'Chính sách đổi IP',
        answer: `• Residential Proxy: Đổi theo session, không giới hạn
• Static Proxy: Đổi 1 lần miễn phí trong 24h đầu
• ISP Proxy: Liên hệ support để đổi
• Rotating Proxy: Tự động đổi, không cần yêu cầu`,
      },
      {
        question: 'Chính sách Refund',
        answer: `Hoàn tiền 100% nếu:
• Proxy không hoạt động trong 24h đầu
• Tỷ lệ uptime < 95%
• Không hoàn tiền nếu: Dùng sai mục đích, vi phạm TOS

Thời gian xử lý: 3-7 ngày làm việc`,
      },
      {
        question: 'Chính sách bảo hành',
        answer: `• Bảo hành miễn phí trong thời gian gói còn hạn
• Không bảo hành nếu: Lỗi do cấu hình sai, target website chặn
• Đổi IP miễn phí nếu proxy die (trong hạn)`,
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
    icon: 'mdi:account',
    label: 'Username hoặc Order ID',
    required: true,
  },
  {
    icon: 'mdi:ip-network',
    label: 'IP proxy gặp lỗi',
    required: true,
  },
  {
    icon: 'mdi:clock',
    label: 'Thời điểm xảy ra lỗi',
    required: true,
  },
  {
    icon: 'mdi:web',
    label: 'Website / dịch vụ đang truy cập',
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
  technical: 'Lỗi kỹ thuật / Proxy không hoạt động',
  'ip-change': 'Yêu cầu đổi IP',
  refund: 'Yêu cầu hoàn tiền',
  billing: 'Vấn đề thanh toán',
  account: 'Vấn đề tài khoản',
  other: 'Khác',
};

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
      subject: 'Proxy không kết nối được',
      category: 'technical',
      description:
        'Proxy của tôi không thể kết nối được từ sáng nay. Đã thử nhiều lần nhưng vẫn lỗi.',
      status: 'resolved',
      createdAt: '2024-01-15 09:30',
      updatedAt: '2024-01-15 14:20',
      resolutionNote: 'Đã kiểm tra và thay thế proxy mới. Vui lòng thử lại.',
    },
    {
      id: 'TKT-002',
      subject: 'Yêu cầu đổi IP',
      category: 'ip-change',
      description: 'Cần đổi IP cho proxy số 12345',
      status: 'processing',
      createdAt: '2024-01-16 10:15',
      updatedAt: '2024-01-16 10:15',
    },
    {
      id: 'TKT-003',
      subject: 'Yêu cầu hoàn tiền',
      category: 'refund',
      description: 'Proxy không hoạt động trong 24h đầu, yêu cầu hoàn tiền',
      status: 'rejected',
      createdAt: '2024-01-14 08:00',
      updatedAt: '2024-01-14 16:30',
      rejectionReason:
        'Proxy đã hoạt động bình thường sau khi kiểm tra. Không đủ điều kiện hoàn tiền.',
    },
    {
      id: 'TKT-004',
      subject: 'Lỗi timeout khi sử dụng',
      category: 'technical',
      description: 'Gặp lỗi timeout khi sử dụng proxy để crawl dữ liệu',
      status: 'pending',
      createdAt: '2024-01-17 11:00',
      updatedAt: '2024-01-17 11:00',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'outage':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
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
        return 'Hoạt động bình thường';
      case 'degraded':
        return 'Chậm hơn bình thường';
      case 'outage':
        return 'Gặp sự cố';
      default:
        return 'Không xác định';
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle ticket submission to API
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketFormData.subject,
      category: ticketFormData.category as TicketCategory,
      description: ticketFormData.description,
      status: 'pending',
      createdAt: new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      updatedAt: new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTickets((prev) => [newTicket, ...prev]);
    setIsTicketDialogOpen(false);

    // Show success toast
    toast.success('Ticket đã được gửi thành công!', {
      description: `Mã ticket: ${newTicket.id}. Chúng tôi sẽ phản hồi sớm nhất có thể.`,
      duration: 5000,
    });

    // Reset form
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
      toast.error('Vui lòng nhập lý do yêu cầu xem lại');
      return;
    }

    // Update ticket status
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id
          ? { ...ticket, status: 'review_requested' as TicketStatus }
          : ticket,
      ),
    );

    toast.success('Yêu cầu xem lại đã được gửi!', {
      description: 'Chúng tôi sẽ xem xét lại ticket của bạn.',
      duration: 5000,
    });

    setIsReviewDialogOpen(false);
    setReviewReason('');
    setIsTicketDetailOpen(false);
    setSelectedTicket(null);
  };

  const getTicketStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-700">
            <Icon icon="mdi:clock-outline" className="h-3.5 w-3.5" />
            Chờ xử lý
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
            <Icon icon="mdi:autorenew" className="h-3.5 w-3.5" />
            Đang xử lý
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            <Icon icon="mdi:check-circle" className="h-3.5 w-3.5" />
            Đã giải quyết
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
            <Icon icon="mdi:close-circle" className="h-3.5 w-3.5" />
            Đã từ chối
          </span>
        );
      case 'review_requested':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
            <Icon icon="mdi:refresh" className="h-3.5 w-3.5" />
            Yêu cầu xem lại
          </span>
        );
      default:
        return null;
    }
  };

  const handleTicketFormChange = (field: string, value: string) => {
    setTicketFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6 px-1">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">
          Hỗ trợ khách hàng
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Xử lý nhanh - Rõ ràng - Không lòng vòng
        </p>
      </div>

      {/* Navigation Tabs - Responsive */}
      <div className="mb-4 sm:mb-6 -mx-1 px-1">
        <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-200 overflow-x-auto scrollbar-hide">
          {[
            { value: 'contact', label: 'Kênh liên hệ', icon: 'mdi:phone' },
            {
              value: 'faq',
              label: 'FAQ',
              icon: 'mdi:frequently-asked-questions',
            },
            {
              value: 'status',
              label: 'Trạng thái hệ thống',
              icon: 'mdi:server',
            },
            { value: 'report', label: 'Báo lỗi', icon: 'mdi:bug' },
            { value: 'tickets', label: 'Ticket của tôi', icon: 'mdi:ticket' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveSection(tab.value)}
              className={
                'pb-2.5 sm:pb-3 px-3 sm:px-4 text-xs sm:text-sm transition font-medium whitespace-nowrap flex items-center gap-1.5 sm:gap-2 min-h-[44px] flex-shrink-0 ' +
                (activeSection === tab.value
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900 active:text-slate-900 border-b-2 border-transparent')
              }
            >
              <Icon
                icon={tab.icon}
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
              />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.value === 'contact'
                  ? 'Liên hệ'
                  : tab.value === 'faq'
                    ? 'FAQ'
                    : tab.value === 'status'
                      ? 'Trạng thái'
                      : tab.value === 'report'
                        ? 'Báo lỗi'
                        : 'Ticket'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Channels Section */}
      {activeSection === 'contact' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Icon
                icon="mdi:shield-alert"
                className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-xs sm:text-sm text-amber-800">
                <p className="font-semibold mb-1">🚫 Cảnh báo quan trọng</p>
                <p className="mb-1.5 sm:mb-2">
                  Chúng tôi KHÔNG hỗ trợ và sẽ khóa tài khoản nếu phát hiện:
                </p>
                <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                  <li>Hack, xâm nhập trái phép</li>
                  <li>Spam email/message</li>
                  <li>Fraud - Lừa đảo tài chính</li>
                  <li>Brute force attack</li>
                  <li>Hoạt động vi phạm pháp luật</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="rounded-lg sm:rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${channel.color} text-white`}
                >
                  <Icon
                    icon={channel.icon}
                    className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {channel.name}
                    </h3>
                    {channel.priority && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
                        {channel.priority}
                      </span>
                    )}
                  </div>
                </div>

                {channel.description && (
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3">
                    {channel.description}
                  </p>
                )}

                <div className="space-y-2 sm:space-y-3">
                  {channel.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-slate-200 pl-2 sm:pl-3"
                    >
                      <div className="text-xs font-semibold text-slate-700 mb-0.5 sm:mb-1">
                        {item.label}
                      </div>
                      {'link' in item && item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-indigo-600 hover:underline font-medium flex items-center gap-1 break-all"
                        >
                          <span className="break-all">{item.value}</span>
                          <Icon
                            icon="mdi:open-in-new"
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0"
                          />
                        </a>
                      ) : (
                        <div className="text-xs sm:text-sm text-slate-600 break-words">
                          {item.value}
                        </div>
                      )}
                      {'description' in item && item.description && (
                        <div className="text-xs text-slate-500 mt-0.5 sm:mt-1 break-words">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}

                  {channel.email && (
                    <div className="border-l-2 border-slate-200 pl-2 sm:pl-3">
                      <a
                        href={`mailto:${channel.email}`}
                        className="text-xs sm:text-sm text-indigo-600 hover:underline font-medium break-all"
                      >
                        {channel.email}
                      </a>
                    </div>
                  )}

                  {channel.statuses && (
                    <div className="border-l-2 border-slate-200 pl-2 sm:pl-3">
                      <div className="text-xs font-semibold text-slate-700 mb-1">
                        Trạng thái ticket
                      </div>
                      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                        {channel.statuses.map((status) => (
                          <span
                            key={status}
                            className="text-xs px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-700 rounded"
                          >
                            {status}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 space-y-1.5 sm:space-y-2">
                  {channel.responseTime && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                      <Icon
                        icon="mdi:clock-outline"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0"
                      />
                      <span className="break-words">
                        Phản hồi: {channel.responseTime}
                      </span>
                    </div>
                  )}
                  {channel.workingHours && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                      <Icon
                        icon="mdi:calendar-clock"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0"
                      />
                      <span className="break-words">
                        {channel.workingHours}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Icon
                icon="mdi:information"
                className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-xs sm:text-sm text-blue-800">
                <p className="font-semibold">💡 Mẹo</p>
                <p>
                  Đọc FAQ trước khi hỏi – Tiết kiệm thời gian cho cả hai bên!
                </p>
              </div>
            </div>
          </div>

          {FAQ_DATA.map((category, idx) => (
            <div
              key={idx}
              className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 sm:p-4 border-b border-slate-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-indigo-600 text-white flex-shrink-0">
                    <Icon
                      icon={category.icon}
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {category.category}
                  </h3>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIdx) => (
                    <AccordionItem
                      key={itemIdx}
                      value={`item-${idx}-${itemIdx}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-2 sm:py-3">
                        <span className="text-xs sm:text-sm font-medium pr-2">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs sm:text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-3 sm:p-4 rounded-lg">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Status Section */}
      {activeSection === 'status' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Icon
                icon="mdi:check-circle"
                className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-xs sm:text-sm text-green-800">
                <p className="font-semibold">Hệ thống hoạt động tốt</p>
                <p>
                  Tất cả dịch vụ đang hoạt động bình thường. Khi có sự cố lớn,
                  thông báo sẽ được đăng trên Telegram Channel.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                Trạng thái dịch vụ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Cập nhật theo thời gian thực
              </p>
            </div>
            <div className="divide-y divide-slate-200">
              {SYSTEM_STATUS.map((service, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Icon
                        icon={getStatusIcon(service.status)}
                        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${service.status === 'operational' ? 'text-green-600' : service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-slate-900 text-xs sm:text-sm truncate">
                          {service.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {service.region}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 sm:px-3 py-1 rounded-full border flex-shrink-0 ${getStatusColor(service.status)}`}
                    >
                      {getStatusText(service.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Section */}
      {activeSection === 'report' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Icon
                icon="mdi:alert"
                className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-xs sm:text-sm text-red-800">
                <p className="font-semibold mb-1.5 sm:mb-2">
                  ⚠️ Quy trình báo lỗi (BẮT BUỘC)
                </p>
                <p>
                  Để được hỗ trợ nhanh, vui lòng cung cấp đầy đủ thông tin.
                  Thiếu thông tin → xử lý chậm.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Thông tin cần cung cấp
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {REPORT_REQUIREMENTS.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-indigo-600 text-white flex-shrink-0">
                    <Icon
                      icon={req.icon}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-xs sm:text-sm">
                      {req.label}
                      {req.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
              ❌ Không bảo hành nếu
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                'Dùng proxy sai mục đích (hack, spam, fraud...)',
                'Tool hoặc script cấu hình sai',
                'Website target chặn từ phía họ',
                'Không cung cấp đủ thông tin khi báo lỗi',
                'Vi phạm điều khoản sử dụng',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700"
                >
                  <Icon
                    icon="mdi:close-circle"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <span className="break-words">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 py-2.5 sm:py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 min-h-[44px] text-sm sm:text-base">
              <Icon icon="mdi:telegram" className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap">Liên hệ qua Telegram</span>
            </button>
            <button
              onClick={() => setIsTicketDialogOpen(true)}
              className="flex-1 py-2.5 sm:py-3 px-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2 min-h-[44px] text-sm sm:text-base"
            >
              <Icon icon="mdi:ticket" className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap">Tạo Ticket</span>
            </button>
          </div>
        </div>
      )}

      {/* My Tickets Section */}
      {activeSection === 'tickets' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <Icon
                icon="mdi:information"
                className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-xs sm:text-sm text-blue-800">
                <p className="font-semibold">💡 Theo dõi ticket</p>
                <p>
                  Xem tất cả ticket bạn đã gửi và trạng thái xử lý của chúng.
                  Bạn có thể yêu cầu xem lại các ticket đã từ chối hoặc giải
                  quyết không thỏa đáng.
                </p>
              </div>
            </div>
          </div>

          {tickets.length === 0 ? (
            <div className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm p-8 sm:p-12 text-center">
              <Icon
                icon="mdi:ticket-outline"
                className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-4"
              />
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                Chưa có ticket nào
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Bạn chưa gửi ticket nào. Hãy tạo ticket mới để được hỗ trợ.
              </p>
              <Button
                onClick={() => setIsTicketDialogOpen(true)}
                variant="primary"
                className="min-h-[44px]"
              >
                <Icon icon="mdi:plus" className="h-4 w-4 mr-2" />
                Tạo ticket mới
              </Button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                            {ticket.subject}
                          </h3>
                          {getTicketStatusBadge(ticket.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:tag" className="h-3.5 w-3.5" />
                            {CATEGORY_LABELS[ticket.category]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon
                              icon="mdi:identifier"
                              className="h-3.5 w-3.5"
                            />
                            {ticket.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon
                              icon="mdi:clock-outline"
                              className="h-3.5 w-3.5"
                            />
                            {ticket.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">
                      {ticket.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button
                        onClick={() => handleViewTicketDetail(ticket)}
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-initial min-h-[40px] sm:min-h-[36px]"
                      >
                        <Icon icon="mdi:eye" className="h-4 w-4 mr-1.5" />
                        Xem chi tiết
                      </Button>
                      {(ticket.status === 'rejected' ||
                        ticket.status === 'resolved') && (
                        <Button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setIsReviewDialogOpen(true);
                          }}
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-initial min-h-[40px] sm:min-h-[36px]"
                        >
                          <Icon icon="mdi:refresh" className="h-4 w-4 mr-1.5" />
                          Yêu cầu xem lại
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          <DialogHeader className="px-4 sm:px-8 pt-4 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
            <DialogTitle className="text-lg sm:text-2xl font-semibold text-slate-900">
              Tạo Ticket
            </DialogTitle>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2">
              Vui lòng điền đầy đủ thông tin để chúng tôi có thể hỗ trợ bạn tốt
              nhất
            </p>
          </DialogHeader>
          <DialogBody className="px-4 sm:px-8 py-4 sm:py-6">
            <form
              onSubmit={handleTicketSubmit}
              className="space-y-5 sm:space-y-6"
            >
              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-900">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Nhập tiêu đề ticket"
                  value={ticketFormData.subject}
                  onChange={(e) =>
                    handleTicketFormChange('subject', e.target.value)
                  }
                  required
                  className="w-full"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-900">
                  Loại vấn đề <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ticketFormData.category}
                  onValueChange={(value) =>
                    handleTicketFormChange('category', value)
                  }
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại vấn đề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">
                      Lỗi kỹ thuật / Proxy không hoạt động
                    </SelectItem>
                    <SelectItem value="ip-change">Yêu cầu đổi IP</SelectItem>
                    <SelectItem value="refund">Yêu cầu hoàn tiền</SelectItem>
                    <SelectItem value="billing">Vấn đề thanh toán</SelectItem>
                    <SelectItem value="account">Vấn đề tài khoản</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-900">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Mô tả chi tiết vấn đề của bạn. Vui lòng cung cấp đầy đủ thông tin để chúng tôi có thể hỗ trợ bạn nhanh chóng."
                  value={ticketFormData.description}
                  onChange={(e) =>
                    handleTicketFormChange('description', e.target.value)
                  }
                  rows={6}
                  required
                  className="w-full resize-none"
                />
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  💡 Vui lòng bao gồm: Username/Order ID, IP proxy (nếu có),
                  thời điểm xảy ra lỗi, website/dịch vụ đang truy cập
                </p>
              </div>

              <DialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-3 pt-6 sm:pt-6 px-0 sm:px-0 border-t border-slate-200 mt-6 sm:mt-8">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px] order-2 sm:order-1"
                  >
                    Hủy
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto min-h-[44px] order-1 sm:order-2"
                >
                  Gửi Ticket
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
          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          {selectedTicket && (
            <>
              <DialogHeader className="px-4 sm:px-8 pt-4 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-lg sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4">
                      {selectedTicket.subject}
                    </DialogTitle>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {getTicketStatusBadge(selectedTicket.status)}
                      <span className="text-xs sm:text-sm text-slate-600 font-medium">
                        {selectedTicket.id}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogBody className="px-4 sm:px-8 py-4 sm:py-6">
                <div className="space-y-6 sm:space-y-7">
                  {/* Ticket Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        Loại vấn đề
                      </label>
                      <div className="text-sm sm:text-base font-medium text-slate-900">
                        {CATEGORY_LABELS[selectedTicket.category]}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        Ngày tạo
                      </label>
                      <div className="text-sm sm:text-base font-medium text-slate-900">
                        {selectedTicket.createdAt}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        Cập nhật lần cuối
                      </label>
                      <div className="text-sm sm:text-base font-medium text-slate-900">
                        {selectedTicket.updatedAt}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2.5">
                    <label className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Mô tả
                    </label>
                    <div className="text-sm sm:text-base text-slate-900 bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-lg whitespace-pre-wrap leading-relaxed">
                      {selectedTicket.description}
                    </div>
                  </div>

                  {/* Rejection Reason */}
                  {selectedTicket.status === 'rejected' &&
                    selectedTicket.rejectionReason && (
                      <div className="space-y-2.5">
                        <label className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wide flex items-center gap-2">
                          <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                          Lý do từ chối
                        </label>
                        <div className="text-sm sm:text-base text-slate-900 bg-red-50 border-2 border-red-200 p-4 sm:p-5 rounded-lg leading-relaxed">
                          {selectedTicket.rejectionReason}
                        </div>
                      </div>
                    )}

                  {/* Resolution Note */}
                  {selectedTicket.status === 'resolved' &&
                    selectedTicket.resolutionNote && (
                      <div className="space-y-2.5">
                        <label className="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide flex items-center gap-2">
                          <Icon icon="mdi:check-circle" className="h-4 w-4" />
                          Ghi chú giải quyết
                        </label>
                        <div className="text-sm sm:text-base text-slate-900 bg-green-50 border-2 border-green-200 p-4 sm:p-5 rounded-lg leading-relaxed">
                          {selectedTicket.resolutionNote}
                        </div>
                      </div>
                    )}
                </div>
              </DialogBody>
              <DialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-3 pt-6 sm:pt-6 px-4 sm:px-8 pb-4 sm:pb-8 border-t border-slate-200 mt-6 sm:mt-8">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    Đóng
                  </Button>
                </DialogClose>
                {(selectedTicket.status === 'rejected' ||
                  selectedTicket.status === 'resolved') && (
                  <Button
                    onClick={() => {
                      setIsTicketDetailOpen(false);
                      setIsReviewDialogOpen(true);
                    }}
                    variant="primary"
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    <Icon icon="mdi:refresh" className="h-4 w-4 mr-2" />
                    Yêu cầu xem lại
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
          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          <DialogHeader className="px-4 sm:px-8 pt-4 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
            <DialogTitle className="text-lg sm:text-2xl font-semibold text-slate-900">
              Yêu cầu xem lại ticket
            </DialogTitle>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2">
              Vui lòng giải thích lý do bạn muốn yêu cầu xem lại ticket này
            </p>
          </DialogHeader>
          <DialogBody className="px-4 sm:px-8 py-4 sm:py-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestReview();
              }}
              className="space-y-5 sm:space-y-6"
            >
              {selectedTicket && (
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-4 sm:p-5 rounded-lg">
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    Ticket
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    {selectedTicket.subject}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {selectedTicket.id}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-900">
                  Lý do yêu cầu xem lại <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Vui lòng giải thích lý do bạn muốn yêu cầu xem lại ticket này..."
                  value={reviewReason}
                  onChange={(e) => setReviewReason(e.target.value)}
                  rows={6}
                  required
                  className="w-full resize-none"
                />
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  💡 Vui lòng cung cấp thông tin chi tiết để chúng tôi có thể
                  xem xét lại ticket của bạn một cách tốt nhất.
                </p>
              </div>

              <DialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-3 pt-6 sm:pt-6 px-0 sm:px-0 border-t border-slate-200 mt-6 sm:mt-8">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px]"
                    onClick={() => setReviewReason('')}
                  >
                    Hủy
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  Gửi yêu cầu
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
