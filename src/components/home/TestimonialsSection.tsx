import React from 'react';
import { Star } from 'lucide-react';
import Card from '../shared/Card';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Michael T.',
      location: 'New York, USA',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      stars: 5,
      text: "I've been using BitMine Social for 6 months now and have already made back my initial investment plus profit. The platform is incredibly easy to use, even for someone like me who knew nothing about Bitcoin mining.",
    },
    {
      name: 'Sarah K.',
      location: 'London, UK',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      stars: 5,
      text: "The referral program is amazing! I've invited several friends and the 10% commission adds up quickly. Combined with my own mining earnings, I'm making more passive income than I ever expected.",
    },
    {
      name: 'David Chen',
      location: 'Singapore',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      stars: 4,
      text: "What I appreciate most is the transparency. I can see exactly how much I'm earning in real-time, and withdrawals are processed quickly. The dashboard is clean and gives me all the information I need.",
    },
    {
      name: 'Emma L.',
      location: 'Toronto, Canada',
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
      stars: 5,
      text: "After researching many Bitcoin mining platforms, I chose BitMine Social for their security features and professional approach. I haven't been disappointed - consistent earnings and excellent support.",
    },
  ];

  return (
    <section className="py-20 px-4" id="testimonials">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Miners Say
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Join thousands of satisfied users who are already mining Bitcoin with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              variant="glass" 
              hover
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16} 
                    className={i < testimonial.stars ? 'text-bitcoin fill-bitcoin' : 'text-muted'}
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground flex-grow">"{testimonial.text}"</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card variant="outlined" className="inline-block max-w-2xl mx-auto p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-bitcoin/20 text-bitcoin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <rect x="7" y="8" width="10" height="8" rx="1"></rect>
                  <path d="M7 8v8"></path>
                  <path d="M17 8v8"></path>
                  <path d="M7 12h10"></path>
                </svg>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold">Join our growing community of over 23,000 miners worldwide</h3>
                <p className="mt-2 text-muted-foreground">Start mining with as little as $250 in Bitcoin and experience the future of social crypto mining.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
