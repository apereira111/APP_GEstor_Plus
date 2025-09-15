// FIX: Provide full implementation for the Sidebar component.
import React from 'react';
import { Stethoscope, DollarSign, Bug, Heart, Baby, Woman, HeartPulse, Target, Hospital } from './icons';

type View = 'dashboard' | 'insights' | 'goals';

interface SidebarProps {
    activePanel: string;
    onPanelChange: (panelId: string) => void;
    currentView: View;
    onViewChange: (view: View) => void;
}

const navItems = [
    { id: 'atencao-primaria', label: 'Atenção Primária', icon: Stethoscope },
    { id: 'rede-de-atendimento', label: 'Rede de Atendimento', icon: Hospital },
    { id: 'financiamento', label: 'Financiamento', icon: DollarSign },
    { id: 'saude-bucal', label: 'Saúde Bucal', icon: Heart },
    { id: 'saude-da-crianca', label: 'Saúde da Criança', icon: Baby },
    { id: 'saude-da-mulher', label: 'Saúde da Mulher', icon: Woman },
    { id: 'doencas-cronicas', label: 'Doenças Crônicas', icon: HeartPulse },
    { id: 'vigilancia-dengue', label: 'Vigilância (Dengue)', icon: Bug },
];

const Sidebar: React.FC<SidebarProps> = ({ activePanel, onPanelChange, currentView, onViewChange }) => {
    
    const handlePanelClick = (panelId: string) => {
        onPanelChange(panelId);
        onViewChange('dashboard'); // Always switch to dashboard view when a panel is clicked
    }

    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col no-print">
            <div className="p-6 text-center border-b border-slate-700">
                <h1 className="text-2xl font-bold">Gestor +</h1>
                <p className="text-xs text-slate-400">Análise de Saúde Pública com IA</p>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {/* Data Panels */}
                <h2 className="px-4 pt-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Painéis de Dados</h2>
                {navItems.map(item => {
                    const isActive = item.id === activePanel && currentView === 'dashboard';
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handlePanelClick(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive 
                                ? 'bg-blue-600 text-white' 
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    )
                })}

                {/* Management Section */}
                <h2 className="px-4 pt-6 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Gestão</h2>
                 <button
                    onClick={() => onViewChange('goals')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        currentView === 'goals'
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    <Target className="w-5 h-5" />
                    <span>Metas</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
