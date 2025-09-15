

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Dashboard from './Dashboard';
import { primaryCareData, financingData } from '../data/mockData';

// Mock child components to isolate the Dashboard component
vi.mock('./StatCard', () => ({
  default: ({ indicator }: { indicator: { title: string } }) => <div data-testid="stat-card">{indicator.title}</div>,
}));

vi.mock('./charts/BarChartComponent', () => ({
  default: ({ title }: { title: string }) => <div data-testid="bar-chart">{title}</div>,
}));

vi.mock('./TableComponent', () => ({
  default: ({ title }: { title: string }) => <div data-testid="table-component">{title}</div>,
}));

vi.mock('./HistoryLogComponent', () => ({
  default: () => <div data-testid="history-log">History Log</div>,
}));

vi.mock('./GoalProgressComponent', () => ({
  default: ({ goal }: { goal: { indicatorTitle: string } }) => <div data-testid="goal-progress">{goal.indicatorTitle}</div>,
}));

// Mock recharts library
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="recharts-container">{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));


describe('Dashboard', () => {
  it('renders StatCard for each KPI', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={primaryCareData} goals={primaryCareData.goals || []} />);
    const statCards = screen.getAllByTestId('stat-card');
    expect(statCards).toHaveLength(primaryCareData.kpis.length);
    expect(screen.getByText('Atendimentos NASF')).toBeInTheDocument();
  });

  it('renders BarChartComponent when chart data is available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={primaryCareData} goals={primaryCareData.goals || []} />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText(primaryCareData.charts![0].title)).toBeInTheDocument();
  });

  it('does not render BarChartComponent when chart data is not available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={financingData} goals={[]} />);
    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
  });

  it('renders HistoryLogComponent when history data is available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={primaryCareData} goals={primaryCareData.goals || []} />);
    expect(screen.getByTestId('history-log')).toBeInTheDocument();
    expect(screen.getByText('Histórico de Atualizações')).toBeInTheDocument();
  });

  it('does not render HistoryLogComponent when history data is not available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={financingData} goals={[]} />);
    expect(screen.queryByTestId('history-log')).not.toBeInTheDocument();
  });

  it('renders GoalProgressComponent when goals data is available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={primaryCareData} goals={primaryCareData.goals || []} />);
    expect(screen.getAllByTestId('goal-progress')).toHaveLength(primaryCareData.goals!.length);
    expect(screen.getByText('Metas e Objetivos')).toBeInTheDocument();
  });

  it('does not render GoalProgressComponent when goals data is not available', () => {
    // FIX: Added 'goals' prop to satisfy DashboardProps.
    render(<Dashboard data={financingData} goals={[]} />);
    expect(screen.queryByTestId('goal-progress')).not.toBeInTheDocument();
  });
});