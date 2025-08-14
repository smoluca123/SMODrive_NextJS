import type { Plan, Feature } from '../types/pricing.types';
import { PLANS } from '../constant/pricing.constants';

export function getPrice(plan: Plan, isYearly: boolean): number {
  return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
}

export function getSavings(plan: Plan): number {
  if (plan.monthlyPrice === 0) return 0;
  const monthlyTotal = plan.monthlyPrice * 12;
  const savings = monthlyTotal - plan.yearlyPrice;
  return Math.round((savings / monthlyTotal) * 100);
}

export function getFeatureValue(plan: Plan, feature: Feature): string | boolean {
  if (feature.key && plan.features[feature.key] !== undefined) {
    return plan.features[feature.key];
  }
  if (feature.values) {
    const planIndex = PLANS.findIndex((p) => p.name === plan.name);
    return feature.values[planIndex];
  }
  return false;
}
