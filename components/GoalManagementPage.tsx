// FIX: Provide full implementation for the GoalManagementPage component.
import React, { useState } from 'react';
import type { Goal } from '../types';
import GoalCard from './GoalCard';
import GoalModal from './GoalModal';
import { Plus } from './icons';

// FIX: Added props interface to make the component controlled by App.tsx.
interface GoalManagementPageProps {
    allGoals: Goal[];
    onAddGoal: (goal: Goal) => void;
    onUpdateGoal: (goal: Goal) => void;
    onDeleteGoal: (goalId: string) => void;
}

// FIX: Updated component to accept and use props.
const GoalManagementPage: React.FC<GoalManagementPageProps> = ({
    allGoals,
    onAddGoal,
    onUpdateGoal,
    onDeleteGoal,
}) => {
    // FIX: Removed local state for goals, now managed by App.tsx.
    const [isModalOpen, setModalOpen] = useState(false);
    const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);

    const handleOpenModal = (goal?: Goal) => {
        setGoalToEdit(goal || null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setGoalToEdit(null);
        setModalOpen(false);
    };

    // FIX: Updated save handler to call props from App.tsx.
    const handleSaveGoal = (goal: Goal) => {
        if (goalToEdit) {
            onUpdateGoal(goal);
        } else {
            onAddGoal(goal);
        }
        handleCloseModal();
    };

    const handleDeleteGoal = (goalId: string) => {
        onDeleteGoal(goalId);
    };


    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Gerenciamento de Metas</h2>
                 <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Adicionar Meta
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* FIX: Used 'allGoals' prop and 'goal.id' for the key. */}
                {allGoals.map(goal => (
                    <GoalCard 
                        key={goal.id}
                        goal={goal}
                        onEdit={() => handleOpenModal(goal)}
                        onDelete={handleDeleteGoal}
                    />
                ))}
            </div>

            <GoalModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveGoal}
                goalToEdit={goalToEdit}
            />
        </div>
    );
};

export default GoalManagementPage;