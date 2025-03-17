
import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import Button from '../shared/Button';

interface NoFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoFundsModal: React.FC<NoFundsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-5 bg-primary/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
            Withdrawal Not Available
          </h3>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">
              There are no funds available to withdraw yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Continue mining to accumulate withdrawable funds or make an additional deposit to increase your mining power.
            </p>
          </div>
          <div className="flex justify-center space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                onClose();
                window.location.href = '/deposit';
              }}
            >
              Make a Deposit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFundsModal;
