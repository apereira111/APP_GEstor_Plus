import React from 'react';
import type { Goal } from '../types';

interface GoalProgressProps {
    goal: Goal;
}

const GoalProgressComponent: React.FC<GoalProgressProps> = ({ goal }) => {
    const { indicatorTitle, description, currentValue, targetValue, unit } = goal;

    // For goals where lower is better (e.g., mortality rate), the progress is inverted.
    const isLowerBetter = currentValue > targetValue && description.toLowerCase().includes('reduzir');
    
    let progress = 0;
    if (targetValue > 0) {
        if(isLowerBetter){
            // If we are already below the target, goal is 100% met.
            if(currentValue <= targetValue) {
                progress = 100;
            } else {
                 // Example: current 8.5, target 8.0. Imagine a "start" of 9.0 (target + (current-target))
                 // This is a simplification and could be improved with a defined "start value"
                 const startValue = targetValue + (currentValue - targetValue) * 2; // A simple heuristic
                 progress = ((startValue - currentValue) / (startValue - targetValue)) * 100;
            }
        } else {
            progress = (currentValue / targetValue) * 100;
        }
    }

    const progressPercentage = Math.max(0, Math.min(progress, 100)).toFixed(1);

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
            <div>
                <h5 className="font-semibold text-gray-800">{indicatorTitle}</h5>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className="mt-4 flex-grow flex flex-col justify-end">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-700">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={parseFloat(progressPercentage)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Progresso da meta ${indicatorTitle}`}
                    ></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-600">
                        Atual: <span className="font-bold text-gray-800">{currentValue}{unit}</span>
                    </span>
                    <span className="text-gray-600">
                        Meta: <span className="font-bold text-gray-800">{targetValue}{unit}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GoalProgressComponent;
