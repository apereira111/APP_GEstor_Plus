

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import GoalProgressComponent from './GoalProgressComponent';
import type { Goal } from '../types';

describe('GoalProgressComponent', () => {
  it('calculates and displays standard progress correctly', () => {
    const goal: Goal = {
      // FIX: Added required 'id' property.
      id: 'goal-test-1',
      indicatorId: 'test-1',
      indicatorTitle: 'Increase Coverage',
      currentValue: 75,
      targetValue: 100,
      unit: '%',
      description: 'Increase something.',
    };
    render(<GoalProgressComponent goal={goal} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 75.0%');
    expect(screen.getByText('75.0%')).toBeInTheDocument();
    expect(screen.getByText('Atual: 75%')).toBeInTheDocument();
    expect(screen.getByText('Meta: 100%')).toBeInTheDocument();
  });

  it('caps progress at 100% even if current value exceeds target', () => {
    const goal: Goal = {
      // FIX: Added required 'id' property.
      id: 'goal-test-2',
      indicatorId: 'test-2',
      indicatorTitle: 'Exceed Target',
      currentValue: 120,
      targetValue: 100,
      unit: ' units',
      description: 'Exceed the target value.',
    };
    render(<GoalProgressComponent goal={goal} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 100.0%');
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });

  it('handles "lower is better" goals correctly when above target', () => {
    const goal: Goal = {
      // FIX: Added required 'id' property.
      id: 'goal-test-3',
      indicatorId: 'test-3',
      indicatorTitle: 'Reduce Mortality',
      currentValue: 8.5,
      targetValue: 8.0,
      unit: '/mil',
      description: 'Reduzir a taxa de mortalidade.',
    };
    render(<GoalProgressComponent goal={goal} />);
    const progressBar = screen.getByRole('progressbar');
    // Heuristic is (start-current)/(start-target). start = 8 + (8.5-8)*2 = 9. (9-8.5)/(9-8) = 0.5/1 = 50%
    expect(progressBar).toHaveStyle('width: 50.0%');
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  it('handles "lower is better" goals correctly when at or below target', () => {
    const goal: Goal = {
      // FIX: Added required 'id' property.
      id: 'goal-test-4',
      indicatorId: 'test-4',
      indicatorTitle: 'Reduce Mortality',
      currentValue: 7.9,
      targetValue: 8.0,
      unit: '/mil',
      description: 'Reduzir a taxa de mortalidade.',
    };
    render(<GoalProgressComponent goal={goal} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 100.0%');
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });

  it('shows 0% progress when target is not met', () => {
     const goal: Goal = {
      // FIX: Added required 'id' property.
      id: 'goal-test-5',
      indicatorId: 'test-5',
      indicatorTitle: 'Start a new program',
      currentValue: 0,
      targetValue: 50,
      unit: ' actions',
      description: 'Implement new actions.',
    };
    render(<GoalProgressComponent goal={goal} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 0.0%');
    expect(screen.getByText('0.0%')).toBeInTheDocument();
  });
});