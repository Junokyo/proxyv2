'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function SupportView() {
  const [activeSection, setActiveSection] = useState('contact');

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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Hỗ trợ khách hàng
        </h1>
        <p className="text-sm text-slate-600">
          Xử lý nhanh - Rõ ràng - Không lòng vòng
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 mb-6 overflow-x-auto">
        {[
          { value: 'contact', label: 'Kênh liên hệ', icon: 'mdi:phone' },
          {
            value: 'faq',
            label: 'FAQ',
            icon: 'mdi:frequently-asked-questions',
          },
          { value: 'status', label: 'Trạng thái hệ thống', icon: 'mdi:server' },
          { value: 'report', label: 'Báo lỗi', icon: 'mdi:bug' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveSection(tab.value)}
            className={
              'pb-3 px-2 text-sm transition font-medium whitespace-nowrap flex items-center gap-2 ' +
              (activeSection === tab.value
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-900')
            }
          >
            <Icon icon={tab.icon} className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contact Channels Section */}
      {activeSection === 'contact' && (
        <div className="space-y-6">
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Icon
                icon="mdi:shield-alert"
                className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">🚫 Cảnh báo quan trọng</p>
                <p className="mb-2">
                  Chúng tôi KHÔNG hỗ trợ và sẽ khóa tài khoản nếu phát hiện:
                </p>
                <ul className="list-disc list-inside space-y-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`flex items-center gap-3 mb-4 p-3 rounded-lg bg-gradient-to-br ${channel.color} text-white`}
                >
                  <Icon icon={channel.icon} className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    {channel.priority && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        {channel.priority}
                      </span>
                    )}
                  </div>
                </div>

                {channel.description && (
                  <p className="text-sm text-slate-600 mb-3">
                    {channel.description}
                  </p>
                )}

                <div className="space-y-3">
                  {channel.items?.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-slate-200 pl-3">
                      <div className="text-xs font-semibold text-slate-700 mb-1">
                        {item.label}
                      </div>
                      {'link' in item && item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:underline font-medium flex items-center gap-1"
                        >
                          {item.value}
                          <Icon
                            icon="mdi:open-in-new"
                            className="h-3.5 w-3.5"
                          />
                        </a>
                      ) : (
                        <div className="text-sm text-slate-600">
                          {item.value}
                        </div>
                      )}
                      {'description' in item && item.description && (
                        <div className="text-xs text-slate-500 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}

                  {channel.email && (
                    <div className="border-l-2 border-slate-200 pl-3">
                      <a
                        href={`mailto:${channel.email}`}
                        className="text-sm text-indigo-600 hover:underline font-medium"
                      >
                        {channel.email}
                      </a>
                    </div>
                  )}

                  {channel.statuses && (
                    <div className="border-l-2 border-slate-200 pl-3">
                      <div className="text-xs font-semibold text-slate-700 mb-1">
                        Trạng thái ticket
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {channel.statuses.map((status) => (
                          <span
                            key={status}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded"
                          >
                            {status}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                  {channel.responseTime && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Icon icon="mdi:clock-outline" className="h-4 w-4" />
                      <span>Phản hồi: {channel.responseTime}</span>
                    </div>
                  )}
                  {channel.workingHours && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Icon icon="mdi:calendar-clock" className="h-4 w-4" />
                      <span>{channel.workingHours}</span>
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
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Icon
                icon="mdi:information"
                className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-blue-800">
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
              className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <Icon icon={category.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    {category.category}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIdx) => (
                    <AccordionItem
                      key={itemIdx}
                      value={`item-${idx}-${itemIdx}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="text-sm font-medium">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-sm text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-lg">
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
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Icon
                icon="mdi:check-circle"
                className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Hệ thống hoạt động tốt</p>
                <p>
                  Tất cả dịch vụ đang hoạt động bình thường. Khi có sự cố lớn,
                  thông báo sẽ được đăng trên Telegram Channel.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Trạng thái dịch vụ
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Cập nhật theo thời gian thực
              </p>
            </div>
            <div className="divide-y divide-slate-200">
              {SYSTEM_STATUS.map((service, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={getStatusIcon(service.status)}
                        className={`h-5 w-5 ${service.status === 'operational' ? 'text-green-600' : service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`}
                      />
                      <div>
                        <div className="font-medium text-slate-900">
                          {service.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {service.region}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(service.status)}`}
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
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Icon
                icon="mdi:alert"
                className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-red-800">
                <p className="font-semibold mb-2">
                  ⚠️ Quy trình báo lỗi (BẮT BUỘC)
                </p>
                <p>
                  Để được hỗ trợ nhanh, vui lòng cung cấp đầy đủ thông tin.
                  Thiếu thông tin → xử lý chậm.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              Thông tin cần cung cấp
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPORT_REQUIREMENTS.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white flex-shrink-0">
                    <Icon icon={req.icon} className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 text-sm">
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

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              ❌ Không bảo hành nếu
            </h3>
            <div className="space-y-3">
              {[
                'Dùng proxy sai mục đích (hack, spam, fraud...)',
                'Tool hoặc script cấu hình sai',
                'Website target chặn từ phía họ',
                'Không cung cấp đủ thông tin khi báo lỗi',
                'Vi phạm điều khoản sử dụng',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <Icon
                    icon="mdi:close-circle"
                    className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <Icon icon="mdi:telegram" className="h-5 w-5" />
              Liên hệ qua Telegram
            </button>
            <button className="flex-1 py-3 px-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
              <Icon icon="mdi:ticket" className="h-5 w-5" />
              Tạo Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
