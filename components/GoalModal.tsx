// FIX: Provide full implementation for the GoalModal component.
import React, { useState, useEffect } from 'react';
import type { Goal } from '../types';
import { X } from './icons';
import { allIndicatorOptions } from '../data/mockData';

interface GoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (goal: Goal) => void;
    goalToEdit?: Goal | null;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, goalToEdit }) => {
    const [goal, setGoal] = useState<Partial<Goal>>({});

    useEffect(() => {
        if (goalToEdit) {
            setGoal(goalToEdit);
        } else {
            setGoal({ unit: '%' }); // Default unit
        }
    }, [goalToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGoal(prev => ({ ...prev, [name]: name.includes('Value') ? parseFloat(value) || 0 : value }));
    };
    
    const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndicator = allIndicatorOptions.find(i => i.id === e.target.value);
        if (selectedIndicator) {
             setGoal(prev => ({ 
                 ...prev,
                 indicatorId: selectedIndicator.id,
                 indicatorTitle: selectedIndicator.title
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (goal.indicatorId && goal.description && goal.currentValue != null && goal.targetValue != null) {
            onSave(goal as Goal);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <header className="flex justify-between items-center p-5 border-b">
                        <h3 className="text-lg font-semibold">{goalToEdit ? 'Editar Meta' : 'Adicionar Nova Meta'}</h3>
                        <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </header>
                    <main className="p-5 space-y-4">
                        <div>
                             <label htmlFor="indicatorId" className="block text-sm font-medium text-gray-700 mb-1">Indicador</label>
                             <select id="indicatorId" name="indicatorId" value={goal.indicatorId || ''} onChange={handleIndicatorChange} required className="w-full h-10 pl-3 border rounded-lg">
                                <option value="" disabled>Selecione um indicador</option>
                                {allIndicatorOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.title}</option>)}
                             </select>
                        </div>
                         <div>
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                             <textarea id="description" name="description" value={goal.description || ''} onChange={handleChange} required rows={3} className="w-full p-2 border rounded-lg"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="currentValue" className="block text-sm font-medium text-gray-700 mb-1">Valor Atual</label>
                                <input type="number" step="any" id="currentValue" name="currentValue" value={goal.currentValue || ''} onChange={handleChange} required className="w-full h-10 px-3 border rounded-lg" />
                            </div>
                             <div>
                                <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700 mb-1">Valor Alvo (Meta)</label>
                                <input type="number" step="any" id="targetValue" name="targetValue" value={goal.targetValue || ''} onChange={handleChange} required className="w-full h-10 px-3 border rounded-lg" />
                            </div>
                        </div>
                         <div>
                             <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                             <input type="text" id="unit" name="unit" value={goal.unit || ''} onChange={handleChange} required placeholder="Ex: %, /mil, M" className="w-full h-10 px-3 border rounded-lg" />
                        </div>
                    </main>
                    <footer className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-white border rounded-lg hover:bg-gray-50">Cancelar</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar Meta</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default GoalModal;
