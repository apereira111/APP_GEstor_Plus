import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import InsightFinder from './InsightFinder';
import * as geminiService from '../services/geminiService';
import * as dataService from '../services/dataService';
import { primaryCareData } from '../data/mockData';

// Mock the services
vi.mock('../services/geminiService', () => ({
  generateCustomAnalysis: vi.fn(),
}));
vi.mock('../services/dataService', () => ({
  fetchAllPanels: vi.fn(),
  fetchPanelData: vi.fn(),
}));

const mockedGenerateCustomAnalysis = vi.mocked(geminiService.generateCustomAnalysis);
const mockedFetchAllPanels = vi.mocked(dataService.fetchAllPanels);
const mockedFetchPanelData = vi.mocked(dataService.fetchPanelData);

const mockPanels = [
    { id: 'atencao-primaria', title: 'Atenção Primária' },
    { id: 'financiamento', title: 'Financiamento' },
];

describe('InsightFinder', () => {
  beforeEach(() => {
    mockedGenerateCustomAnalysis.mockClear();
    mockedFetchAllPanels.mockClear();
    mockedFetchPanelData.mockClear();
    // Default successful mock
    mockedFetchAllPanels.mockResolvedValue(mockPanels);
  });

  it('renders initial state, fetches panels, and populates the dropdown', async () => {
    render(<InsightFinder />);
    
    // Initial state
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Carregando painéis...' })).toBeInTheDocument();

    // After panels are fetched
    await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeEnabled();
    });

    expect(screen.getByRole('option', { name: 'Atenção Primária' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Financiamento' })).toBeInTheDocument();
  });

  it('enables the analyze button only when a panel is selected and prompt is entered', async () => {
    render(<InsightFinder />);
    
    await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeEnabled();
    });
    
    const analyzeButton = screen.getByRole('button', { name: /Analisar/i });
    const promptInput = screen.getByPlaceholderText(/Ex: Quais são as principais tendências/i);
    const panelSelect = screen.getByRole('combobox');

    // Button should be disabled initially
    expect(analyzeButton).toBeDisabled();

    // Enter prompt, but no panel selected
    fireEvent.change(promptInput, { target: { value: 'Test prompt' } });
    expect(analyzeButton).toBeDisabled();

    // Select panel, but prompt is empty
    fireEvent.change(promptInput, { target: { value: '' } });
    fireEvent.change(panelSelect, { target: { value: 'atencao-primaria' } });
    expect(analyzeButton).toBeDisabled();

    // Both are filled, button should be enabled
    fireEvent.change(promptInput, { target: { value: 'Test prompt' } });
    expect(analyzeButton).toBeEnabled();
  });
  
  it('calls services with correct data and displays the result on success', async () => {
    const mockAnalysisText = '### Análise Completa\nEsta é a análise do painel.';
    mockedGenerateCustomAnalysis.mockResolvedValue(mockAnalysisText);
    mockedFetchPanelData.mockResolvedValue(primaryCareData);

    render(<InsightFinder />);

    await waitFor(() => expect(screen.getByRole('combobox')).toBeEnabled());

    const promptInput = screen.getByPlaceholderText(/Ex: Quais são as principais tendências/i);
    const panelSelect = screen.getByRole('combobox');
    const analyzeButton = screen.getByRole('button', { name: /Analisar/i });

    // Fill form
    fireEvent.change(panelSelect, { target: { value: 'atencao-primaria' } });
    fireEvent.change(promptInput, { target: { value: 'Analise os KPIs' } });

    // Click button
    fireEvent.click(analyzeButton);

    // Shows loading state
    expect(screen.getByText('Analisando...')).toBeInTheDocument();

    // Waits for the result to be displayed
    await waitFor(() => {
      expect(screen.getByText('Análise Completa')).toBeInTheDocument();
    });

    // Check if services were called correctly
    expect(mockedFetchPanelData).toHaveBeenCalledTimes(1);
    expect(mockedFetchPanelData).toHaveBeenCalledWith('atencao-primaria');
    
    expect(mockedGenerateCustomAnalysis).toHaveBeenCalledTimes(1);
    expect(mockedGenerateCustomAnalysis).toHaveBeenCalledWith(
        'Analise os KPIs',
        primaryCareData
    );
  });

   it('displays an error message when Gemini API call fails', async () => {
    mockedFetchPanelData.mockResolvedValue(primaryCareData);
    mockedGenerateCustomAnalysis.mockRejectedValue(new Error('API Error'));

    render(<InsightFinder />);
    
    await waitFor(() => expect(screen.getByRole('combobox')).toBeEnabled());
    
    const promptInput = screen.getByPlaceholderText(/Ex: Quais são as principais tendências/i);
    const panelSelect = screen.getByRole('combobox');
    const analyzeButton = screen.getByRole('button', { name: /Analisar/i });

    // Fill form
    fireEvent.change(panelSelect, { target: { value: 'atencao-primaria' } });
    fireEvent.change(promptInput, { target: { value: 'Analise os KPIs' } });

    fireEvent.click(analyzeButton);

    // Waits for the error message
    await waitFor(() => {
        expect(screen.getByText('Ocorreu um erro ao gerar a análise. Por favor, tente novamente.')).toBeInTheDocument();
    });
   });
});
