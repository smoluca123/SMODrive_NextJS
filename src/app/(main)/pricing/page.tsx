import { HeroSection } from './components/hero-section';
import { PricingCardsSection } from './components/pricing-cards-section';
import { FeatureComparisonTable } from './components/feature-comparison-table';
import { FAQSection } from './components/faq-section';
import { CTASection } from './components/cta-section';

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-background'>
      <HeroSection />
      <PricingCardsSection />
      <FeatureComparisonTable />
      <FAQSection />
      <CTASection />
    </div>
  );
}
