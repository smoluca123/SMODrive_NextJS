import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { TestimonialsSection } from './components/testimonials-section';
import { PricingSection } from './components/pricing-section';
import { CTASection } from './components/cta-section';
import { Footer } from './components/footer';
import { FloatingChatButton } from './components/floating-chat-button';

export default function HomePage() {
  return (
    <div className='h-full overflow-y-auto'>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
