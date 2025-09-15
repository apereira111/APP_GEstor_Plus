import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

export interface BarChartProps {
  title: string;
  data: ChartDataPoint[];
  dataKey: string;
  nameKey: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={nameKey} tick={{ fill: '#6B7280', fontSize: 12 }} />
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(Number(value))} tick={{ fill: '#6B7280', fontSize: 12 }} />
        <Tooltip
          cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            fontSize: '12px'
          }}
          formatter={(value) => [new Intl.NumberFormat('pt-BR').format(Number(value)), 'Atendimentos']}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Bar dataKey={dataKey} fill="#3B82F6" name="Atendimentos" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;