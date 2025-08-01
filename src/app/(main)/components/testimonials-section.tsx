import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Artist',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      "I've earned over $5,000 in just 3 months sharing my design templates. The platform is incredibly user-friendly!",
    rating: 5,
  },
  {
    name: 'Mike Rodriguez',
    role: 'Software Developer',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      'Perfect for sharing code snippets and tools. The analytics help me understand what my audience wants.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Content Creator',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      'The passive income from my educational PDFs has been amazing. Highly recommend ShareEarn!',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of creators earning passive income
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || '/placeholder.svg'}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
