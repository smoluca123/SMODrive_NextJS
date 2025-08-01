import { IPlanDataType } from '@/lib/types/interfaces/plan.interfaces';

export interface ISubscriptionDataType {
  id: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: null;
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
