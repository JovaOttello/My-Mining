
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, ZapOff, TrendingUp, Server, Loader2, ArrowDownToLine } from 'lucide-react';
import Button from '@/components/shared/Button';
import { useToast } from '@/hooks/use-toast';

const LiveMiningSimulation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balance, setBalance] = useState(18);
  const [balanceBtc, setBalanceBtc] = useState(0.00025);
  const [hashRate, setHashRate] = useState(135);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [loadingSimulation, setLoadingSimulation] = useState(true);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Setup and cleanup window event handler
  useEffect(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, []);

  // Load the Three.js simulation after a delay to show the loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSimulation(false);
      initThreeJsSimulation();
      startMiningSimulation();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Simulates growing balance over time
  const startMiningSimulation = () => {
    setSimulationStarted(true);
    
    // Simulate mining balance growth from $18 to $458 over time
    const balanceInterval = setInterval(() => {
      setBalance(prev => {
        // Grow faster at start, slower as we approach max
        const newBalance = prev + Math.random() * 0.5;
        return newBalance >= 458 ? 458 : newBalance;
      });
      
      setBalanceBtc(prev => {
        const newBalanceBtc = prev + (Math.random() * 0.0001);
        return newBalanceBtc >= 0.0027 ? 0.0027 : newBalanceBtc;
      });
      
      // Simulate hashrate fluctuations
      setHashRate(135 + (Math.random() * 10 - 5));
      
    }, 3000);

    // Simulate new block found
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        toast({
          title: "New Block Mined!",
          description: `Earned ${(Math.random() * 0.001).toFixed(6)} BTC ($${Math.floor(Math.random() * 30) + 80})`,
        });
      }
    }, 20000);

    return () => {
      clearInterval(balanceInterval);
      clearInterval(notificationInterval);
    };
  };

  // Initialize Three.js mining simulation
  const initThreeJsSimulation = () => {
    if (!canvasRef.current) return;
    
    // We'd normally load Three.js and set up a complex scene here
    // For this example, we'll just use canvas 2D graphics as a placeholder
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const renderFrame = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Set background
      ctx.fillStyle = '#0f1520';
      ctx.fillRect(0, 0, width, height);
      
      // Draw mining rigs
      drawMiningRigs(ctx, width, height);
      
      // Draw blockchain visualization
      drawBlockchain(ctx, width, height);
      
      // Request next frame
      animationFrameId.current = requestAnimationFrame(renderFrame);
    };
    
    // Start animation loop
    renderFrame();
  };
  
  // Helper functions for canvas drawing
  const drawMiningRigs = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw multiple mining rigs with animations
    for (let i = 0; i < 3; i++) {
      const x = width * 0.2 + (i * width * 0.3);
      const y = height * 0.4;
      const size = width * 0.15;
      
      // Mining rig body
      ctx.fillStyle = '#1a2233';
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Blinking LEDs
      const now = Date.now();
      ctx.fillStyle = (now % 1000 < 500) ? '#f7931a' : '#4ade80';
      ctx.fillRect(x - size/2 + 10, y - size/2 + 10, 8, 8);
      
      ctx.fillStyle = (now % 800 < 400) ? '#3b82f6' : '#4ade80';
      ctx.fillRect(x - size/2 + 30, y - size/2 + 10, 8, 8);
      
      // Spinning fans
      const fanRadius = size * 0.2;
      const angle = (now % 2000) / 2000 * Math.PI * 2;
      
      ctx.beginPath();
      ctx.arc(x, y, fanRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#2a3349';
      ctx.fill();
      
      // Fan blades
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      for (let j = 0; j < 3; j++) {
        ctx.rotate(Math.PI * 2 / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -fanRadius);
        ctx.lineTo(fanRadius * 0.3, -fanRadius * 0.7);
        ctx.closePath();
        ctx.fillStyle = '#4a5568';
        ctx.fill();
      }
      
      ctx.restore();
      
      // Hash rate labels
      ctx.fillStyle = '#a3aed0';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.floor(hashRate - 5 + i*10)} TH/s`, x, y + size/2 + 20);
    }
  };
  
  const drawBlockchain = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const blockSize = width * 0.05;
    const blockSpacing = blockSize * 1.2;
    const blockY = height * 0.7;
    const centerX = width / 2;
    const blocksCount = 7;
    
    // Draw chain of blocks
    for (let i = 0; i < blocksCount; i++) {
      const blockX = centerX + (i - Math.floor(blocksCount/2)) * blockSpacing;
      
      // Block
      ctx.fillStyle = i === Math.floor(blocksCount/2) ? '#f7931a20' : '#23304680';
      ctx.strokeStyle = i === Math.floor(blocksCount/2) ? '#f7931a' : '#4059a9';
      ctx.lineWidth = 2;
      
      // Pulsating animation for the central block
      let scale = 1;
      if (i === Math.floor(blocksCount/2)) {
        const now = Date.now();
        scale = 1 + Math.sin(now / 500) * 0.05;
      }
      
      const adjustedSize = blockSize * scale;
      
      // Draw block
      ctx.fillRect(blockX - adjustedSize/2, blockY - adjustedSize/2, adjustedSize, adjustedSize);
      ctx.strokeRect(blockX - adjustedSize/2, blockY - adjustedSize/2, adjustedSize, adjustedSize);
      
      // Connect blocks with lines
      if (i < blocksCount - 1) {
        ctx.beginPath();
        ctx.moveTo(blockX + adjustedSize/2, blockY);
        ctx.lineTo(blockX + blockSpacing - blockSize/2, blockY);
        ctx.strokeStyle = '#304a82';
        ctx.stroke();
      }
    }
    
    // Flowing data particles along the blockchain
    const now = Date.now();
    for (let i = 0; i < blocksCount - 1; i++) {
      const blockX = centerX + (i - Math.floor(blocksCount/2)) * blockSpacing;
      const nextBlockX = blockX + blockSpacing;
      
      // Multiple particles per connection with different speeds
      for (let p = 0; p < 3; p++) {
        const speed = 1000 + p * 300; // Different speeds
        const position = ((now % speed) / speed);
        const particleX = blockX + (nextBlockX - blockX) * position;
        
        ctx.beginPath();
        ctx.arc(particleX, blockY, 3, 0, Math.PI * 2);
        ctx.fillStyle = p === 0 ? '#f7931a' : (p === 1 ? '#4ade80' : '#3b82f6');
        ctx.fill();
      }
    }
    
    // Draw mining data/transactions
    ctx.fillStyle = '#a3aed0';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Live Mining Blockchain', centerX, blockY + blockSize + 20);
  };

  const handleWithdrawClick = () => {
    setWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawModalOpen(false);
  };

  const handleMakeDeposit = () => {
    setWithdrawModalOpen(false);
    // Redirect to deposit page after a short delay
    setTimeout(() => {
      navigate('/deposit');
    }, 1500);
  };

  const handleBack = () => {
    setExitConfirmOpen(true);
  };

  const confirmExit = () => {
    // Clear the license from localStorage when exiting
    localStorage.removeItem('miningLicense');
    navigate('/');
  };

  const cancelExit = () => {
    setExitConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loadingSimulation ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
          <div className="flex items-center gap-2 mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-xl">Initializing Mining Dashboard</span>
          </div>
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${Math.random() * 30 + 70}%` }}
            ></div>
          </div>
          <p className="text-muted-foreground mt-4">
            Connecting to mining servers...
          </p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={handleBack}
            >
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={handleWithdrawClick}
                leftIcon={<ArrowDownToLine className="animate-pulse" />}
                className="bg-gradient-to-r from-[#9b87f5] to-[#D946EF] text-white font-bold 
                          hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 
                          border-2 border-[#9b87f5]/20"
                size="lg"
              >
                WITHDRAW FUNDS
              </Button>
              
              <div className="flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                <span className="text-sm font-medium text-green-500">Mining Active</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Profit Counter
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-muted-foreground text-sm">USD Profit</div>
                  <div className="text-3xl font-bold text-accent">${balance.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">BTC Earnings</div>
                  <div className="text-3xl font-bold text-bitcoin">{balanceBtc.toFixed(6)} BTC</div>
                </div>
                <div className="pt-2">
                  <div className="text-muted-foreground text-sm mb-1">Mining Progress</div>
                  <div className="h-2 w-full bg-muted rounded">
                    <div 
                      className="h-2 bg-primary rounded transition-all" 
                      style={{ width: `${(balance / 458) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Server size={20} className="text-primary" />
                Mining Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hash Rate</span>
                  <span className="font-medium">{hashRate.toFixed(2)} TH/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mining Difficulty</span>
                  <span className="font-medium">29.17 T</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Network Status</span>
                  <span className="text-green-500 px-2 py-0.5 bg-green-400/10 rounded-full text-xs font-medium">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu size={20} className="text-primary" />
                System Health
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-medium">62°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Power Consumption</span>
                  <span className="font-medium">3.2 kW/h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium">23.8 J/TH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fan Status</span>
                  <span className="text-green-500 px-2 py-0.5 bg-green-400/10 rounded-full text-xs font-medium">OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mining visualization canvas */}
          <div className="glass-card p-2 h-[400px] overflow-hidden">
            <canvas 
              ref={canvasRef}
              width={1200}
              height={400}
              className="w-full h-full"
            />
          </div>
          
          {/* Live transaction feed */}
          <div className="mt-6 glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Live Transaction Feed</h3>
            <div className="h-32 overflow-y-auto space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Transaction #f83a9c</span>
                <span className="text-bitcoin">+0.00015 BTC</span>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Transaction #b72e3d</span>
                <span className="text-bitcoin">+0.00023 BTC</span>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Transaction #a91f7b</span>
                <span className="text-bitcoin">+0.00008 BTC</span>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Transaction #c56d2e</span>
                <span className="text-bitcoin">+0.00019 BTC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-semibold mb-4">Withdrawal Requirements</h3>
            
            <p className="text-muted-foreground mb-6">
              Your mining profits must reach a minimum of $400 before you can make a withdrawal. This threshold ensures efficient processing of transactions.
            </p>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
              <p className="text-amber-500 text-sm">
                <strong>Important:</strong> You'll need to make an initial deposit to activate your mining account before you can withdraw any profits.
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={closeWithdrawModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleMakeDeposit}
                className="bg-primary hover:bg-primary/90"
              >
                Make a Deposit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Exit confirmation dialog */}
      {exitConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <ZapOff size={24} />
              <h3 className="text-xl font-semibold">Exit Dashboard</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to leave the mining dashboard?
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={cancelExit}
              >
                Continue Mining
              </Button>
              <Button
                variant="destructive"
                onClick={confirmExit}
              >
                Exit Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

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

export default LiveMiningSimulation;
