import React from 'react';
import type { GoalHistoryLog } from '../types';
import { ArrowRight, Target } from './icons';

interface GoalHistoryProps {
    logs: GoalHistoryLog[];
}

const GoalHistoryComponent: React.FC<GoalHistoryProps> = ({ logs }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        });
    };

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {logs.map((log, logIdx) => (
                    <li key={logIdx}>
                        <div className="relative pb-8">
                            {logIdx !== logs.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                        <Target className="h-5 w-5 text-gray-500" />
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Meta ajustada para <span className="font-semibold text-gray-800">{log.indicatorTitle}</span>
                                        </p>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <span className="font-medium text-gray-700">{log.oldTargetValue}{log.unit}</span>
                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium text-green-600">{log.newTargetValue}{log.unit}</span>
                                        </div>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <time dateTime={log.date}>{formatDate(log.date)}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalHistoryComponent;