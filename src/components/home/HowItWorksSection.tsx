
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, Bitcoin, Zap, TrendingUp, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Button from '../shared/Button';

const HowItWorksSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDepositClick = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      navigate('/deposit');
    } else {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the deposit page.",
        variant: "destructive",
      });
    }
  };
  
  const steps = [
    {
      icon: UserPlus,
      title: 'Create an Account',
      description: 'Sign up via Google, Facebook, Apple, or email. Setup takes less than 2 minutes.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Bitcoin,
      title: 'Deposit Bitcoin',
      description: 'Deposit a minimum of $250 in BTC to the address provided to start mining.',
      color: 'text-bitcoin',
      bgColor: 'bg-bitcoin/10',
    },
    {
      icon: Zap,
      title: 'Mining Begins',
      description: 'Our system automatically starts mining after payment confirmation. No setup required.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: TrendingUp,
      title: 'Earn Daily Profits',
      description: 'Earn daily Bitcoin profits based on your deposit amount and current mining conditions.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: Wallet,
      title: 'Withdraw Anytime',
      description: 'Withdraw your earnings to your personal Bitcoin wallet at any time, 24/7.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-navy-dark to-navy relative" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(247,147,26,0.15),transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How BitMine Social Works
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Start mining Bitcoin in minutes with our simple 5-step process.
            No technical knowledge required.
          </p>
        </div>
        
        <div className="flex flex-col max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-8 relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-14px)] bg-gradient-to-b from-muted-foreground to-muted z-0"></div>
              )}
              
              {/* Step number */}
              <div className="flex-shrink-0 z-10">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              
              {/* Step content */}
              <div className="ml-6">
                <div className={`p-3 rounded-full ${step.bgColor} ${step.color} inline-block mb-2`}>
                  <step.icon size={18} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {/* Special card for step 2 - Bitcoin deposit */}
                {index === 1 && (
                  <div className="mt-4 glass p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Deposit BTC to this address:</p>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted p-2 rounded text-xs md:text-sm font-mono overflow-x-auto whitespace-nowrap">
                            bc1qcm6wmwk47q35axp75gvkwsnhrsfvwks3yf6sqd
                          </code>
                          <button
                            className="p-2 bg-secondary rounded hover:bg-secondary/70 transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText('bc1qcm6wmwk47q35axp75gvkwsnhrsfvwks3yf6sqd');
                              toast({
                                title: "Address Copied",
                                description: "Bitcoin wallet address copied to clipboard",
                              });
                            }}
                            aria-label="Copy address"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        rightIcon={<ArrowRight size={14} />}
                        onClick={handleDepositClick}
                      >
                        Deposit Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            rightIcon={<ArrowRight size={18} />}
            onClick={handleDepositClick}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
