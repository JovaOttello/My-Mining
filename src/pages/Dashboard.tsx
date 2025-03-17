
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bitcoin, 
  Activity, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  BarChart3,
  Power,
  RefreshCcw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import MiningChart from '../components/dashboard/MiningChart';
import DashboardStats from '../components/dashboard/DashboardStats';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [hasDeposited, setHasDeposited] = useState(false);
  const [miningStats, setMiningStats] = useState({
    totalMined: 0.00021,
    dailyProfit: 0.00005,
    hashrate: 120,
    miningPower: 68,
    activeMiners: 1254,
    sessionStatus: 'active',
    lastPayout: '2h 34m ago',
    nextPayout: '9h 26m',
    depositAmount: 0,
  });
  
  useEffect(() => {
    // Check if user has made a deposit
    const depositStatus = localStorage.getItem('hasDeposited') === 'true';
    const depositAmount = Number(localStorage.getItem('depositAmount') || '0');
    
    if (depositStatus) {
      setHasDeposited(true);
      // Update mining stats based on deposit amount
      setMiningStats(prev => ({
        ...prev,
        depositAmount,
        totalMined: +(0.00021 * (depositAmount / 250)).toFixed(5),
        dailyProfit: +(0.00005 * (depositAmount / 250)).toFixed(5),
        hashrate: 120 * (depositAmount / 250),
        miningPower: Math.min(68 + (depositAmount > 500 ? 12 : 0), 100),
      }));
    }
    
    // If not logged in, redirect to home
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/');
    }
    
    // Simulate real-time mining stats update
    const interval = setInterval(() => {
      if (depositStatus) {
        setMiningStats(prev => ({
          ...prev,
          totalMined: +(prev.totalMined + 0.00000002 * (depositAmount / 250)).toFixed(8),
        }));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isLoggedIn, navigate]);
  
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Requested",
      description: "Your withdrawal will be processed within 24 hours.",
    });
  };
  
  const handleUpgrade = () => {
    navigate('/deposit');
  };
  
  const handleMakeDeposit = () => {
    navigate('/deposit');
  };
  
  if (!hasDeposited) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card variant="glass" className="p-8 text-center">
              <div className="p-4 mb-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
                <Bitcoin size={32} className="text-bitcoin" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Start Your Mining Journey</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You need to make a deposit to start mining Bitcoin. The minimum deposit is $250 in Bitcoin.
              </p>
              <Button 
                size="lg" 
                leftIcon={<Bitcoin size={20} />}
                onClick={handleMakeDeposit}
              >
                Make Your First Deposit
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Mining Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor your Bitcoin mining performance and earnings
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                leftIcon={<ArrowUp size={18} />}
                onClick={handleWithdraw}
              >
                Withdraw Earnings
              </Button>
              <Button 
                leftIcon={<Power size={18} />}
                onClick={handleUpgrade}
              >
                Upgrade Mining Power
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Total Mined</h3>
                <Bitcoin size={20} className="text-bitcoin" />
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-bitcoin">
                  {miningStats.totalMined.toFixed(8)}
                </div>
                <div className="text-xs text-green-400 flex items-center">
                  <ArrowUp size={12} className="mr-1" />
                  <span>+2.4%</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                ≈ ${(miningStats.totalMined * 40000).toFixed(2)} USD
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Daily Profit</h3>
                <Activity size={20} className="text-green-400" />
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-green-400">
                  {miningStats.dailyProfit.toFixed(8)}
                </div>
                <div className="text-xs text-green-400 flex items-center">
                  <span>BTC/day</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                ≈ ${(miningStats.dailyProfit * 40000).toFixed(2)} USD/day
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Mining Status</h3>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400/20">
                  <div className="h-3 w-3 rounded-full bg-green-400 pulse"></div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-white capitalize">
                  {miningStats.sessionStatus}
                </div>
                <Button 
                  variant="outline" 
                  className="h-8 px-2 text-xs" 
                  leftIcon={<RefreshCcw size={12} />}
                >
                  Refresh
                </Button>
              </div>
              <div className="text-sm text-muted-foreground mt-2 flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Next payout in {miningStats.nextPayout}</span>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <DashboardStats 
              title="Hashrate" 
              value={`${miningStats.hashrate.toFixed(0)} TH/s`}
              icon={<BarChart3 size={18} className="text-primary" />}
              change="+5.2%"
              positive={true}
            />
            <DashboardStats 
              title="Mining Power" 
              value={`${miningStats.miningPower}%`}
              icon={<Power size={18} className="text-green-400" />}
              progress={miningStats.miningPower}
            />
            <DashboardStats 
              title="Active Miners" 
              value={miningStats.activeMiners.toString()}
              icon={<Activity size={18} className="text-blue-400" />}
              change="+12"
              positive={true}
            />
            <DashboardStats 
              title="Last Payout" 
              value={miningStats.lastPayout}
              icon={<Clock size={18} className="text-muted-foreground" />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Mining Performance</h3>
                <div className="h-[300px]">
                  <MiningChart />
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Investment</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Plan</span>
                    <span className="font-medium">
                      ${miningStats.depositAmount} Package
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Return</span>
                    <span className="font-medium text-green-400">
                      {miningStats.depositAmount <= 250 ? '0.5%' : 
                       miningStats.depositAmount <= 500 ? '0.6%' : 
                       miningStats.depositAmount <= 1000 ? '0.7%' : '0.8%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Return</span>
                    <span className="font-medium text-green-400">
                      {miningStats.depositAmount <= 250 ? '15%' : 
                       miningStats.depositAmount <= 500 ? '18%' : 
                       miningStats.depositAmount <= 1000 ? '21%' : '24%'}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between">
                    <span className="text-muted-foreground">Contract Duration</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <Button 
                    variant="accent" 
                    fullWidth
                    leftIcon={<ArrowUp size={18} />}
                    onClick={handleUpgrade}
                  >
                    Upgrade Mining Power
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
