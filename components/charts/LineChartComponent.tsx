// FIX: Provide full implementation for the LineChartComponent.
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

export interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  dataKey: string;
  nameKey: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            fontSize: '12px'
          }}
          formatter={(value) => [new Intl.NumberFormat('pt-BR').format(Number(value)), 'Valor']}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Line type="monotone" dataKey={dataKey} stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
