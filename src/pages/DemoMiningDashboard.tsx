
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bitcoin, 
  Activity, 
  Clock, 
  ArrowUp, 
  Power,
  RefreshCcw,
  ArrowDownToLine
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import MiningChart from '../components/dashboard/MiningChart';
import DashboardStats from '../components/dashboard/DashboardStats';
import { useToast } from '@/hooks/use-toast';

const DemoMiningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample mining stats for the demo
  const miningStats = {
    totalMined: 0.00021,
    dailyProfit: 0.00005,
    hashrate: 120,
    miningPower: 68,
    activeMiners: 1254,
    sessionStatus: 'inactive',
    lastPayout: '2h 34m ago',
    nextPayout: '9h 26m',
  };
  
  const handleMakeDeposit = () => {
    navigate('/deposit');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Mining Dashboard Demo</h1>
              <p className="text-muted-foreground">
                Preview of your Bitcoin mining performance and earnings
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                leftIcon={<ArrowUp size={18} />}
                disabled
                className="cursor-not-allowed opacity-70"
              >
                Withdraw Earnings
              </Button>
              <Button 
                onClick={handleMakeDeposit}
                leftIcon={<ArrowDownToLine size={18} />}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg
                          hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 
                          animate-pulse"
                size="lg"
              >
                ACTIVATE MINING
              </Button>
            </div>
          </div>
          
          {/* Demo notice banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-primary font-medium text-center">
              This is a demo version of the mining dashboard. Make a deposit to activate your mining account and start earning Bitcoin.
            </p>
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
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20">
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-white capitalize">
                  Inactive
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
                <span>Make a deposit to activate</span>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <DashboardStats 
              title="Hashrate" 
              value={`${miningStats.hashrate.toFixed(0)} TH/s`}
              icon={<Activity size={18} className="text-primary" />}
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
                <h3 className="text-lg font-medium mb-4">Start Mining Today</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Basic Plan</span>
                    <span className="font-medium">
                      $250 Package
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Return</span>
                    <span className="font-medium text-green-400">
                      0.5%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Return</span>
                    <span className="font-medium text-green-400">
                      15%
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
                    onClick={handleMakeDeposit}
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold 
                             hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 
                             border-2 border-[#FFD700]/20 animate-pulse"
                  >
                    MAKE A DEPOSIT TO START MINING
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <style>
        {`
        .glass-card {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }
        
        .text-bitcoin {
          color: #f7931a;
        }
        
        @keyframes blockPulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        `}
      </style>
    </div>
  );
};

export default DemoMiningDashboard;
