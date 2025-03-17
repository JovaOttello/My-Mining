
import React from 'react';
import { TrendingUp, Users, Zap, Bitcoin } from 'lucide-react';
import Card from '../shared/Card';

interface DashboardStatProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
  progress?: number;
}

const DashboardStats = ({ 
  title, 
  value, 
  icon, 
  change, 
  positive, 
  progress 
}: DashboardStatProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">{value}</p>
        {change && (
          <span className={`text-xs flex items-center ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      {progress !== undefined && (
        <div className="mt-2 w-full bg-background rounded-full h-2.5">
          <div 
            className="bg-green-400 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </Card>
  );
};

export default DashboardStats;
