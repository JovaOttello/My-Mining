
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../shared/Card';

const MiningChart: React.FC = () => {
  // Sample data for the chart - this would typically come from an API in a real app
  const data = [
    { name: 'Mar 1', btc: 0.00024, usd: 12.36 },
    { name: 'Mar 2', btc: 0.00027, usd: 13.86 },
    { name: 'Mar 3', btc: 0.00022, usd: 11.29 },
    { name: 'Mar 4', btc: 0.00029, usd: 14.88 },
    { name: 'Mar 5', btc: 0.00031, usd: 15.91 },
    { name: 'Mar 6', btc: 0.00026, usd: 13.35 },
    { name: 'Mar 7', btc: 0.00028, usd: 14.37 },
    { name: 'Mar 8', btc: 0.00032, usd: 16.42 },
    { name: 'Mar 9', btc: 0.00030, usd: 15.39 },
    { name: 'Mar 10', btc: 0.00035, usd: 17.95 },
    { name: 'Mar 11', btc: 0.00033, usd: 16.93 },
    { name: 'Mar 12', btc: 0.00036, usd: 18.47 },
    { name: 'Mar 13', btc: 0.00038, usd: 19.50 },
    { name: 'Mar 14', btc: 0.00041, usd: 21.04 },
  ];

  const formatBTC = (value: number) => `${value.toFixed(5)} BTC`;
  const formatUSD = (value: number) => `$${value.toFixed(2)}`;
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass text-sm p-3 rounded-lg">
          <p className="font-medium">{label}</p>
          <p className="text-bitcoin">BTC: {formatBTC(payload[0].value)}</p>
          <p className="text-green-400">USD: {formatUSD(payload[1].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card variant="glass" className="mt-6">
      <div className="flex flex-col">
        <div className="px-1">
          <h3 className="text-lg font-semibold">Mining Earnings</h3>
          <p className="text-muted-foreground text-sm">Last 14 days</p>
        </div>
        
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                yAxisId="btc"
                orientation="left"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={formatBTC}
                domain={['dataMin - 0.00005', 'dataMax + 0.00005']}
              />
              <YAxis 
                yAxisId="usd"
                orientation="right"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={formatUSD}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="btc"
                type="monotone" 
                dataKey="btc" 
                stroke="#f7931a" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#f7931a', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#f7931a', stroke: 'rgba(247, 147, 26, 0.3)', strokeWidth: 4 }}
              />
              <Line 
                yAxisId="usd"
                type="monotone" 
                dataKey="usd" 
                stroke="#4ade80" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#4ade80', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#4ade80', stroke: 'rgba(74, 222, 128, 0.3)', strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default MiningChart;
