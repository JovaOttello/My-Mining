import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bitcoin, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Button from '../shared/Button';
import AuthModal from '../auth/AuthModal';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('signup');
  const [hasDeposited, setHasDeposited] = useState(false);
  
  useEffect(() => {
    const depositStatus = localStorage.getItem('hasDeposited') === 'true';
    setHasDeposited(depositStatus);
  }, []);
  
  const openModal = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsModalOpen(true);
  };
  
  const toggleView = () => {
    setAuthView(authView === 'login' ? 'signup' : 'login');
  };

  const handleStartMining = () => {
    if (isLoggedIn) {
      if (hasDeposited) {
        navigate('/dashboard');
      } else {
        navigate('/deposit');
      }
    } else {
      openModal('signup');
      toast({
        title: "Welcome to BitMine Social",
        description: "Sign up to start mining Bitcoin today!",
      });
    }
  };

  const handleJoinMining = () => {
    if (isLoggedIn) {
      if (hasDeposited) {
        navigate('/dashboard');
      } else {
        navigate('/deposit');
      }
    } else {
      openModal('signup');
      toast({
        title: "Join Mining",
        description: "Create an account to start mining with us!",
      });
    }
  };

  return (
    <section className="min-h-screen px-4 flex flex-col justify-center relative overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-background z-10"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(29,78,216,0.15),transparent_80%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(247,147,26,0.1),transparent_80%)]"></div>
        
        <div className="absolute top-1/4 right-1/4 opacity-20 animate-float">
          <Bitcoin size={160} className="text-bitcoin" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Bitcoin size={120} className="text-bitcoin" />
        </div>
        <div className="absolute top-2/3 right-1/3 opacity-15 animate-float" style={{ animationDelay: '2s' }}>
          <Bitcoin size={100} className="text-bitcoin" />
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-3 py-1 mb-6 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                Revolutionary Social Mining
                <ChevronRight size={16} />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Mine Bitcoin Together,</span>
              <span className="block mt-2">
                <span className="text-gradient">Earn</span> Without Hassle
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              BitMine Social is the future of cryptocurrency mining. Pool resources, 
              reduce costs, and earn more Bitcoin through our innovative social mining platform.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Button 
                size="lg" 
                rightIcon={<ArrowRight size={18} />}
                onClick={handleStartMining}
              >
                {isLoggedIn 
                  ? hasDeposited 
                    ? "Go to Dashboard" 
                    : "Deposit & Start Mining" 
                  : "Start Mining Now"}
              </Button>
              
              {!isLoggedIn && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => openModal('login')}
                >
                  Log In
                </Button>
              )}
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-bitcoin">$250</span>
                <span className="text-sm text-muted-foreground">Minimum Deposit</span>
              </div>
              <div className="h-10 border-l border-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-primary">10%</span>
                <span className="text-sm text-muted-foreground">Referral Bonus</span>
              </div>
              <div className="h-10 border-l border-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-green-400">24/7</span>
                <span className="text-sm text-muted-foreground">Mining Performance</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -right-4 px-3 py-1 bg-primary rounded-full text-sm font-medium text-primary-foreground">
                Live Mining
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Mining Dashboard Preview</h3>
              
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Hashrate</span>
                    <span className="text-white font-medium">125 TH/s</span>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Today's Earnings</span>
                    <span className="text-bitcoin font-medium">0.00041 BTC</span>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Mining Power</span>
                    <div className="w-32">
                      <div className="h-2 w-full bg-muted rounded">
                        <div className="h-2 bg-primary rounded" style={{ width: '70%' }}></div>
                      </div>
                      <div className="text-xs text-right mt-1 text-muted-foreground">70%</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">24h Mining Status</span>
                    <span className="text-green-400 px-2 py-0.5 bg-green-400/10 rounded-full text-xs font-medium">ACTIVE</span>
                  </div>
                </div>
              </div>
              
              <Button fullWidth className="mt-6" onClick={handleJoinMining}>
                {isLoggedIn 
                  ? hasDeposited 
                    ? "View Your Dashboard" 
                    : "Deposit & Start Mining" 
                  : "Join and Start Mining"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        view={authView}
        switchView={toggleView}
      />
    </section>
  );
};

export default HeroSection;
