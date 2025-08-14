import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { PLANS, FEATURE_CATEGORIES } from '@/lib/constant/pricing.constants';
import { getFeatureValue } from '@/lib/utils/pricing.utils';
import { Fragment } from 'react';

function renderFeatureValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className='h-5 w-5 text-green-500 mx-auto' />
    ) : (
      <X className='h-5 w-5 text-gray-300 mx-auto' />
    );
  }
  return <span className='text-sm font-medium'>{value}</span>;
}

export function FeatureComparisonTable() {
  return (
    <section className='py-16 lg:py-24 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold'>Compare All Features</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            See exactly what&apos;s included in each plan with our detailed comparison
          </p>
        </div>

        <div className='max-w-7xl mx-auto'>
          <Card className='overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/50'>
                    <th className='text-left p-4 font-semibold min-w-[200px]'>Features</th>
                    {PLANS.map((plan) => (
                      <th key={plan.name} className='text-center p-4 font-semibold min-w-[120px]'>
                        <div className='space-y-2'>
                          <div
                            className={`h-8 w-8 ${plan.bgColor} rounded-lg flex items-center justify-center mx-auto`}
                          >
                            <plan.icon className={`h-4 w-4 ${plan.color}`} />
                          </div>
                          <div>{plan.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_CATEGORIES.map((category, categoryIndex) => (
                    <Fragment key={category.category}>
                      <tr key={category.category} className='border-b bg-muted/20'>
                        <td
                          colSpan={5}
                          className='p-4 font-semibold text-sm uppercase tracking-wide'
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr
                          key={`${categoryIndex}-${featureIndex}`}
                          className='border-b hover:bg-muted/20'
                        >
                          <td className='p-4 text-sm font-medium'>{feature.name}</td>
                          {PLANS.map((plan) => (
                            <td key={plan.name} className='p-4 text-center'>
                              {renderFeatureValue(getFeatureValue(plan, feature))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
