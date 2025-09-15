// FIX: Provide all type definitions for the application.
export interface Indicator {
  id: string;
  title: string;
  value: string;
  description: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface Chart {
  title:string;
  type: 'bar' | 'pie' | 'line';
  data: ChartDataPoint[];
  dataKey: string;
  nameKey: string;
}

export interface Table {
    title: string;
    headers: string[];
    rows: (string | number)[][];
}

export interface HistoryLog {
    date: string;
    indicatorTitle: string;
    oldValue: string;
    newValue: string;
}

export interface Goal {
    // FIX: Added required 'id' property to Goal type.
    id: string;
    indicatorId: string;
    indicatorTitle: string;
    description: string;
    currentValue: number;
    targetValue: number;
    unit: string;
}

// FIX: Added missing GoalSuggestion type.
export interface GoalSuggestion {
  suggestedValue: number;
  justification: string;
}

export interface GoalHistoryLog {
    date: string;
    indicatorTitle: string;
    oldTargetValue: number;
    newTargetValue: number;
    unit: string;
}

export interface PanelData {
  id: string;
  title: string;
  kpis: Indicator[];
  charts?: Chart[];
  tables?: Table[];
  history?: HistoryLog[];
  goals?: Goal[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Filters {
    state: string;
    city: string;
    startYear: number;
    endYear: number;
}