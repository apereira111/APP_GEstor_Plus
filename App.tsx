// FIX: Provide full implementation for the App component.
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import InsightFinder from './components/InsightFinder';
import FilterBar from './components/FilterBar';
import GoalManagementPage from './components/GoalManagementPage';
import { fetchInitialGoals } from './services/dataService';
import { useHealthData } from './hooks/useHealthData';
import type { Filters, Goal } from './types';
import { BookOpen, Loader } from './components/icons';

type View = 'dashboard' | 'insights' | 'goals';

const App: React.FC = () => {
    const [activePanel, setActivePanel] = useState('atencao-primaria');
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [filters, setFilters] = useState<Filters>({
        state: 'BR',
        city: '',
        startYear: new Date().getFullYear() - 1,
        endYear: new Date().getFullYear(),
    });
    const [userGoals, setUserGoals] = useState<Goal[]>([]);

    const { data: activePanelData, isLoading, error } = useHealthData(activePanel);
    
    useEffect(() => {
        // Fetch initial goals once when the app loads
        fetchInitialGoals().then(setUserGoals);
    }, []);
    
    const addGoal = (goal: Goal) => {
        const newGoal = { ...goal, id: `user-${Date.now()}` };
        setUserGoals(prev => [...prev, newGoal]);
    };
    
    const updateGoal = (updatedGoal: Goal) => {
        setUserGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    };

    const deleteGoal = (goalId: string) => {
        setUserGoals(prev => prev.filter(g => g.id !== goalId));
    };


    const handleFilterChange = (filterName: keyof Filters, value: string | number) => {
        const newFilters = { ...filters, [filterName]: value };
        if (filterName === 'state' && newFilters.state !== filters.state) {
            newFilters.city = '';
        }
        setFilters(newFilters);
    };

    const activePanelGoals = useMemo(() => {
        if (!activePanelData) return [];
        // In a real app, goals might also be filtered by location/time.
        // For now, just show goals related to the active panel.
        const panelIndicatorIds = activePanelData.kpis.map(kpi => kpi.id);
        return userGoals.filter(goal => panelIndicatorIds.includes(goal.indicatorId));
    }, [activePanelData, userGoals]);


    const renderContent = () => {
        switch (currentView) {
            case 'goals':
                return <GoalManagementPage 
                            allGoals={userGoals} 
                            onAddGoal={addGoal}
                            onUpdateGoal={updateGoal}
                            onDeleteGoal={deleteGoal}
                        />;
            case 'insights':
                return <InsightFinder />;
            case 'dashboard':
            default:
                 return (
                    <>
                        <div className="p-8 pb-0">
                           <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                        {isLoading && (
                             <div className="flex flex-col justify-center items-center h-96 text-gray-600">
                                <Loader className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                                <p className="font-semibold">Carregando dados do painel...</p>
                            </div>
                        )}
                        {error && (
                            <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg mx-8">
                                <h3 className="font-bold">Ocorreu um erro</h3>
                                <p>Não foi possível carregar os dados do painel: {error}</p>
                            </div>
                        )}
                        {!isLoading && !error && activePanelData && (
                            <Dashboard data={activePanelData} goals={activePanelGoals} />
                        )}
                         {!isLoading && !error && !activePanelData && (
                            <div className="p-8 text-center text-gray-500">
                                <p>Selecione um painel para visualizar os dados.</p>
                            </div>
                        )}
                    </>
                 );
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} currentView={currentView} onViewChange={setCurrentView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center gap-4 no-print border-b">
                     <div>
                        {/* Potencial para breadcrumbs ou título da visão atual */}
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setCurrentView('dashboard')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => setCurrentView('insights')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentView === 'insights' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                             <BookOpen className="w-4 h-4" />
                             Gere Relatórios com IA
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                   {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
