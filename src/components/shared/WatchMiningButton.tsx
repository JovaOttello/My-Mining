
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Server } from 'lucide-react';
import Button from './Button';

const WatchMiningButton: React.FC = () => {
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    navigate('/demo-mining');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <Button 
        onClick={handleWatchDemo}
        size="lg"
        leftIcon={<Server size={18} />}
        className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
      >
        Watch Mining Live
      </Button>
    </div>
  );
};

export default WatchMiningButton;
