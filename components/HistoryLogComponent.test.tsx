

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import HistoryLogComponent from './HistoryLogComponent';
import type { HistoryLog } from '../types';

describe('HistoryLogComponent', () => {
  const mockLogs: HistoryLog[] = [
    { date: '2024-07-15', indicatorTitle: 'Cobertura ESF', oldValue: '81.9%', newValue: '82.1%' },
    { date: '2024-07-10', indicatorTitle: 'Consultas Médicas', oldValue: '524.1M', newValue: '523.4M' },
  ];

  it('renders a list of logs', () => {
    render(<HistoryLogComponent logs={mockLogs} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('displays the correct content for each log entry', () => {
    render(<HistoryLogComponent logs={mockLogs} />);
    
    // Check first log item
    expect(screen.getByText(/Atualização em/)).toBeInTheDocument();
    expect(screen.getByText('Cobertura ESF')).toBeInTheDocument();
    expect(screen.getByText('81.9%')).toBeInTheDocument();
    expect(screen.getByText('82.1%')).toBeInTheDocument();
    
    // Check second log item
    expect(screen.getByText('Consultas Médicas')).toBeInTheDocument();
    expect(screen.getByText('524.1M')).toBeInTheDocument();
    expect(screen.getByText('523.4M')).toBeInTheDocument();
  });

  it('formats the date correctly to pt-BR locale', () => {
    render(<HistoryLogComponent logs={mockLogs} />);
    // The component adds a day to the date to handle timezone issues, so 2024-07-15 becomes 16 de jul. de 2024
    expect(screen.getByText('16 de jul. de 2024')).toBeInTheDocument();
    expect(screen.getByText('11 de jul. de 2024')).toBeInTheDocument();
  });

  it('renders the vertical line for all but the last item', () => {
    const { container } = render(<HistoryLogComponent logs={mockLogs} />);
    // The vertical line is a span with specific classes. There should be N-1 lines.
    const lines = container.querySelectorAll('.absolute.left-4.top-4.-ml-px.h-full.w-0\\.5.bg-gray-200');
    expect(lines).toHaveLength(mockLogs.length - 1);
  });
});