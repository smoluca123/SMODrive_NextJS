export interface IPlanDataType {
  id: string;
  name: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  downloadLimit: string;
  uploadLimit: string;
  storageLimit: string;
  features: string[];
  maxFileSize: string;
}

export interface ISubscriptionDataType {
  id: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  paymentMethod: null;
  paymentStatus: string;
  amountPaid: number;
  currency: string;
  transactionId: null;
  notes: null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionWithPlanDataType extends ISubscriptionDataType {
  plan: IPlanDataType;
}
