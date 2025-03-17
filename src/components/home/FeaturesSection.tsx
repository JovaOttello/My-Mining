
import React from 'react';
import { Lock, Zap, Users, Bitcoin, Gift, BarChart, Wallet, Shield } from 'lucide-react';
import Card from '../shared/Card';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Bitcoin,
      title: 'Bitcoin Mining',
      description: 'Mine Bitcoin without expensive hardware. Our cloud mining solution handles everything for you.',
      color: 'text-bitcoin',
      bgColor: 'bg-bitcoin/10',
    },
    {
      icon: Users,
      title: 'Social Mining',
      description: 'Join our community of miners to share resources and maximize efficiency and profits.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Our mining servers operate 24/7 with 99.9% uptime for maximum Bitcoin extraction.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: Gift,
      title: 'Referral Program',
      description: 'Earn 10% commission from every deposit made by users you refer to our platform.',
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
    },
    {
      icon: Wallet,
      title: 'Daily Payouts',
      description: 'Receive your earnings daily. Withdraw your Bitcoin whenever you want, with no lockup period.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: BarChart,
      title: 'Real-time Statistics',
      description: 'Monitor your mining operations with detailed, real-time statistics and analytics.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
    {
      icon: Lock,
      title: 'Secure Platform',
      description: 'Your investments and data are protected by bank-level security systems and encryption.',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      icon: Shield,
      title: 'Verified Company',
      description: 'We are a legally registered and fully compliant cryptocurrency mining operation.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
    },
  ];

  return (
    <section className="py-20 px-4" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Advanced Features for Bitcoin Miners
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Our platform combines cutting-edge technology with a community-driven approach 
            to make Bitcoin mining accessible, profitable, and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="glass" 
              hover
              className="text-center flex flex-col items-center"
            >
              <div className={`p-4 rounded-full ${feature.bgColor} ${feature.color} mb-4`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
