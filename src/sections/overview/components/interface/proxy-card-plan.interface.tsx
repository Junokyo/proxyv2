export interface ProxyPlanStat {
  label: string;
  value: string;
  unit?: string;
  icon?: string; // emoji tạm, sau này đổi SVG cũng được
}

export interface ProxyPlanCardProps {
  title: string;
  description: string;
  icon?: string;

  stats: ProxyPlanStat[]; // các ô: Remaining traffic / Expiration time / ...
  links?: string[]; // Automatic renewal, Alert settings...

  primaryButtonLabel?: string; // nút "Start using"

  pricePanel: {
    price: string; // "0.65", "70"
    unit: string; // "/GB", "/Day"
    badgeText?: string; // "83% OFF", "Unlimited traffic"
    fromText?: string; // mặc định: "Starts from"
    features: string[]; // list bên phải
    buttonLabel?: string; // "Buy Now"
  };
}
