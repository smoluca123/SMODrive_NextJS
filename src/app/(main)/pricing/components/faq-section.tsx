import { Card } from '@/components/ui/card';
import { FAQS } from '@/lib/constant/pricing.constants';

export function FAQSection() {
  return (
    <section className='py-16 lg:py-24'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold'>Frequently Asked Questions</h2>
          <p className='text-xl text-muted-foreground'>
            Everything you need to know about our pricing
          </p>
        </div>

        <div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-8'>
          {FAQS.map((faq, index) => (
            <Card key={index} className='p-6'>
              <h3 className='font-semibold mb-2'>{faq.question}</h3>
              <p className='text-muted-foreground text-sm'>{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
