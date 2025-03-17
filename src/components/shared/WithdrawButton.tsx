
import React, { useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Button from './Button';

interface WithdrawButtonProps {
  className?: string;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    toast({
      title: "Withdrawal Threshold Not Met",
      description: "Your profits must reach $400 before you can withdraw. Continue mining to increase your earnings.",
      variant: "default",
    });
    setIsModalOpen(false);
    
    // Redirect to deposit page after a short delay
    setTimeout(() => {
      window.location.href = '/deposit';
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        leftIcon={<ArrowDownToLine className="animate-pulse" />}
        className={`bg-gradient-to-r from-[#9b87f5] to-[#D946EF] text-white font-bold 
                   hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 
                   border-2 border-[#9b87f5]/20 ${className}`}
        size="lg"
      >
        WITHDRAW FUNDS
      </Button>

      {/* Withdrawal Modal */}
      {isModalOpen && (
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
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-primary hover:bg-primary/90"
              >
                Make a Deposit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawButton;
