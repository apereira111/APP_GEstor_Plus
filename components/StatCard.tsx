import React from 'react';
import type { Indicator } from '../types';
import { Stethoscope, DollarSign, Bug, Heart, Baby, Woman, HeartPulse, TrendingUp, TrendingDown, Hospital } from './icons';

interface StatCardProps {
  indicator: Indicator;
  panelId: string; // Used to determine the icon
}

const iconMap: Record<string, React.ElementType> = {
  'atencao-primaria': Stethoscope,
  'financiamento': DollarSign,
  'saude-bucal': Heart,
  'saude-da-crianca': Baby,
  'saude-da-mulher': Woman,
  'doencas-cronicas': HeartPulse,
  'vigilancia-dengue': Bug,
  'rede-de-atendimento': Hospital,
};

const StatCard: React.FC<StatCardProps> = ({ indicator, panelId }) => {
  const { title, value, description, change, changeType } = indicator;
  const Icon = iconMap[panelId] || Stethoscope;
  
  const isPositive = changeType === 'increase';
  const changeColor = isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1" title={description}>
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-semibold text-gray-600">{title}</h4>
         <div className="bg-slate-100 text-blue-600 rounded-lg p-2">
            <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
            <div className="flex items-center mt-1">
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${changeColor}`}>
                    <ChangeIcon className="w-3 h-3" />
                    {change}
                </span>
            </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
