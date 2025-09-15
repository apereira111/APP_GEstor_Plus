import React from 'react';
import type { HistoryLog } from '../types';
import { ArrowRight } from './icons';

interface HistoryLogProps {
    logs: HistoryLog[];
}

const HistoryLogComponent: React.FC<HistoryLogProps> = ({ logs }) => {
    // Format date for consistent display and to handle potential timezone issues
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Add a day to counteract potential timezone conversion to the previous day
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
                                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Atualização em <span className="font-semibold text-gray-800">{log.indicatorTitle}</span>
                                        </p>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <span className="font-medium text-gray-700">{log.oldValue}</span>
                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium text-green-600">{log.newValue}</span>
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

export default HistoryLogComponent;