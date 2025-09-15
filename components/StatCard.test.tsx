

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StatCard from './StatCard';
import type { Indicator } from '../types';

describe('StatCard', () => {
  const baseIndicator: Indicator = {
    id: 'pc-1',
    title: 'Test Indicator',
    value: '1,234',
    description: 'This is a test description.',
  };

  it('renders the indicator title and value correctly', () => {
    render(<StatCard indicator={baseIndicator} panelId="atencao-primaria" />);
    expect(screen.getByText('Test Indicator')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('displays a positive change with a green background and trending up icon', () => {
    const indicator: Indicator = {
      ...baseIndicator,
      change: '+5.2%',
      changeType: 'increase',
    };
    render(<StatCard indicator={indicator} panelId="atencao-primaria" />);

    const changeElement = screen.getByText('+5.2%');
    expect(changeElement).toBeInTheDocument();
    // Check for the parent span's classes
    expect(changeElement.parentElement).toHaveClass('bg-green-100', 'text-green-800');
    // Check if the TrendingUp icon is rendered (by checking its polyline points)
    expect(document.querySelector('polyline[points="23 6 13.5 15.5 8.5 10.5 1 18"]')).toBeInTheDocument();
  });

  it('displays a negative change with a red background and trending down icon', () => {
    const indicator: Indicator = {
      ...baseIndicator,
      change: '-1.8%',
      changeType: 'decrease',
    };
    render(<StatCard indicator={indicator} panelId="atencao-primaria" />);
    
    const changeElement = screen.getByText('-1.8%');
    expect(changeElement).toBeInTheDocument();
    expect(changeElement.parentElement).toHaveClass('bg-red-100', 'text-red-800');
     // Check if the TrendingDown icon is rendered (by checking its polyline points)
    expect(document.querySelector('polyline[points="23 18 13.5 8.5 8.5 13.5 1 6"]')).toBeInTheDocument();
  });

  it('does not display change elements if change data is not provided', () => {
    render(<StatCard indicator={baseIndicator} panelId="atencao-primaria" />);
    expect(screen.queryByTestId('change-indicator')).not.toBeInTheDocument();
  });

  it('renders the correct icon based on panelId', () => {
    render(<StatCard indicator={baseIndicator} panelId="vigilancia-dengue" />);
    // Check for the Bug icon by looking for one of its unique SVG paths
    expect(document.querySelector('rect[width="8"][height="14"]')).toBeInTheDocument();
  });
});