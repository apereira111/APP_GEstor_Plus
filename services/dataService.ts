import { allPanelData } from '../data/mockData';
import type { PanelData, Goal } from '../types';

const SIMULATED_DELAY = 500; // ms

/**
 * Simulates fetching data for a specific panel with a delay.
 * @param panelId The ID of the panel to fetch.
 * @returns A promise that resolves with the PanelData.
 */
export const fetchPanelData = (panelId: string): Promise<PanelData> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = allPanelData[panelId];
            if (data) {
                // Return a deep copy to prevent mutation issues across re-renders
                resolve(JSON.parse(JSON.stringify(data)));
            } else {
                reject(new Error('Painel de dados não encontrado.'));
            }
        }, SIMULATED_DELAY);
    });
};

/**
 * Simulates fetching a list of all available panels.
 * @returns A promise that resolves with a list of panel IDs and titles.
 */
export const fetchAllPanels = (): Promise<{ id: string; title: string }[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const panelList = Object.values(allPanelData).map(p => ({ id: p.id, title: p.title }));
            resolve(panelList);
        }, SIMULATED_DELAY / 3);
    });
};

/**
 * Simulates fetching all predefined goals at app startup.
 * @returns A promise that resolves with an array of all goals.
 */
export const fetchInitialGoals = (): Promise<Goal[]> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            const goals = Object.values(allPanelData).flatMap(panel => panel.goals || []);
             // Return a deep copy
            resolve(JSON.parse(JSON.stringify(goals)));
        }, 100); // Faster, as it's an initial load
    });
}
