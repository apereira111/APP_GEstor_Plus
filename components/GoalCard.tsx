// FIX: Provide full implementation for the GoalCard component.
import React from 'react';
import type { Goal } from '../types';
import GoalProgressComponent from './GoalProgressComponent';
import { Edit, Trash } from './icons';

interface GoalCardProps {
    goal: Goal;
    onEdit: (goal: Goal) => void;
    onDelete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 transition-all hover:shadow-md relative">
            <div className="absolute top-3 right-3 flex gap-2">
                 <button onClick={() => onEdit(goal)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full">
                    <Edit className="w-4 h-4" />
                </button>
                 {/* FIX: Changed onDelete to pass goal.id instead of goal.indicatorId */}
                 <button onClick={() => onDelete(goal.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full">
                    <Trash className="w-4 h-4" />
                </button>
            </div>
           <GoalProgressComponent goal={goal} />
        </div>
    );
};

export default GoalCard;