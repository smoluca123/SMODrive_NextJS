export interface PlanFeatures {
  storage: string;
  uploads: string;
  downloads: string;
  revenue: string;
  analytics: string;
  support: string;
  customization: boolean;
  priority: boolean;
  api: boolean;
  whitelabel: boolean;
  dedicated: boolean;
  advanced: boolean;
}

export interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge: string | null;
  icon: any; // Lucide icon component
  color: string;
  bgColor: string;
  borderColor: string;
  features: PlanFeatures;
  limitations: string[];
}

export interface Feature {
  name: string;
  key?: keyof PlanFeatures;
  values?: (string | boolean)[];
}

export interface FeatureCategory {
  category: string;
  features: Feature[];
}

export interface FAQ {
  question: string;
  answer: string;
}
