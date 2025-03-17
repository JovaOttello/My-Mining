import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

const MiningProfitsCalculator: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(250);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("250");

  // Profit percentage based on deposit amount (higher deposits get better rates)
  const getProfitPercentage = (amount: number): number => {
    if (amount >= 10000) return 0.018; // 1.8% daily
    if (amount >= 5000) return 0.016; // 1.6% daily
    if (amount >= 1000) return 0.014; // 1.4% daily
    if (amount >= 500) return 0.012; // 1.2% daily
    return 0.01; // 1% daily baseline
  };

  const calculateProfit = (amount: number, days: number): number => {
    const dailyPercentage = getProfitPercentage(amount);
    return amount * dailyPercentage * days;
  };

  const getTimeframeMultiplier = (): number => {
    switch (timeframe) {
      case 'daily': return 1;
      case 'weekly': return 7;
      case 'monthly': return 30;
      case 'yearly': return 365;
      default: return 30;
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleCalculate = () => {
    // Convert input value to number and ensure it's at least 250
    const numericValue = parseInt(inputValue);
    if (!isNaN(numericValue)) {
      setDepositAmount(Math.max(250, numericValue));
      setShowResults(true);
    } else {
      setDepositAmount(250);
      setShowResults(true);
    }
  };

  const resetCalculator = () => {
    setShowResults(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getResultData = () => {
    const multiplier = getTimeframeMultiplier();
    const dailyPercentage = getProfitPercentage(depositAmount);
    const profit = calculateProfit(depositAmount, multiplier);
    const totalValue = depositAmount + profit;
    
    return {
      profit,
      totalValue,
      roi: (profit / depositAmount) * 100,
      dailyPercentage: dailyPercentage * 100
    };
  };

  return (
    <Card className="max-w-xl mx-auto" variant="default">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex items-center space-x-3 text-primary">
          <Calculator size={24} />
          <h2 className="text-xl md:text-2xl font-bold">Mining Profits Calculator</h2>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground">
          Estimate your potential Bitcoin mining profits based on your investment. 
          Higher investments lead to better mining efficiency and greater returns.
        </p>
        
        {!showResults ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="deposit-amount" className="block text-sm font-medium mb-1">
                Investment Amount (USD)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <DollarSign size={16} />
                </div>
                <Input
                  id="deposit-amount"
                  type="number"
                  min={250}
                  className="pl-10"
                  value={inputValue}
                  onChange={handleAmountChange}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum deposit: $250</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Timeframe</label>
              <div className="grid grid-cols-4 gap-1 md:gap-2">
                {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                  <button
                    key={period}
                    className={`py-1 md:py-2 px-2 md:px-3 rounded-md border text-xs md:text-sm transition-all ${
                      timeframe === period 
                        ? 'border-primary bg-primary/10 text-primary font-medium' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setTimeframe(period as any)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <Button 
              variant="primary" 
              fullWidth 
              size="lg"
              leftIcon={<TrendingUp size={18} />}
              onClick={handleCalculate}
            >
              Calculate Mining Profits
            </Button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {(() => {
                const resultData = getResultData();
                return (
                  <>
                    <div className="bg-secondary/50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs md:text-sm text-muted-foreground">Daily Mining Rate</p>
                      <p className="text-lg md:text-xl font-bold text-primary">{resultData.dailyPercentage.toFixed(1)}%</p>
                    </div>
                    <div className="bg-secondary/50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs md:text-sm text-muted-foreground">ROI ({timeframe})</p>
                      <p className="text-lg md:text-xl font-bold text-emerald-500">+{resultData.roi.toFixed(1)}%</p>
                    </div>
                    <div className="bg-secondary/50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs md:text-sm text-muted-foreground">Initial Investment</p>
                      <p className="text-lg md:text-xl font-bold">{formatCurrency(depositAmount)}</p>
                    </div>
                    <div className="bg-secondary/50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs md:text-sm text-muted-foreground">Mining Profit</p>
                      <p className="text-lg md:text-xl font-bold text-emerald-500">+{formatCurrency(resultData.profit)}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm md:text-base font-medium">Total Value ({timeframe})</h3>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {formatCurrency(getResultData().totalValue)}
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Your ${depositAmount} investment with a {getResultData().dailyPercentage.toFixed(1)}% daily mining rate 
                would yield approximately {formatCurrency(getResultData().profit)} in {timeframe} profits.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={resetCalculator}>
                Recalculate
              </Button>
              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => window.location.href = '/deposit'}
              >
                Start Mining Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MiningProfitsCalculator;
