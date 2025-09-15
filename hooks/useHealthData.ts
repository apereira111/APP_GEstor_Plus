import { useState, useEffect } from 'react';
import { fetchPanelData } from '../services/dataService';
import type { PanelData } from '../types';

export const useHealthData = (panelId: string) => {
    const [data, setData] = useState<PanelData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!panelId) {
            setData(null);
            return;
        };

        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            setData(null); // Clear previous data
            try {
                const panelData = await fetchPanelData(panelId);
                setData(panelData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [panelId]);

    return { data, isLoading, error };
};
