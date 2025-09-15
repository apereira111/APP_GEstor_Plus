// FIX: Provide full implementation for the Dashboard component.
import React, { useState } from 'react';
import type { PanelData, Goal } from '../types';
import StatCard from './StatCard';
import BarChartComponent from './charts/BarChartComponent';
import PieChartComponent from './charts/PieChartComponent';
import LineChartComponent from './charts/LineChartComponent';
import TableComponent from './TableComponent';
import HistoryLogComponent from './HistoryLogComponent';
import GoalProgressComponent from './GoalProgressComponent';
import ReportModal from './ReportModal';
import { generateReport } from '../services/geminiService';
import { FileText } from './icons';


interface DashboardProps {
  data: PanelData;
  // FIX: Added 'goals' to DashboardProps to accept filtered goals.
  goals: Goal[];
}

const Dashboard: React.FC<DashboardProps> = ({ data, goals }) => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isReportLoading, setReportLoading] = useState(false);

  const handleGenerateReport = async () => {
    setReportModalOpen(true);
    setReportLoading(true);
    try {
        const content = await generateReport(data);
        setReportContent(content);
    } catch (error) {
        console.error(error);
        setReportContent("Ocorreu um erro ao gerar o relatório. Por favor, tente novamente.");
    } finally {
        setReportLoading(false);
    }
  };


  return (
    <div className="p-8 pt-0 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
        <button 
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
            <FileText className="w-5 h-5" />
            Gerar Relatório com IA
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.kpis.map(kpi => (
          <StatCard key={kpi.id} indicator={kpi} panelId={data.id} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Tables Section */}
        <div className="lg:col-span-2 space-y-6">
            {data.charts && data.charts.map((chart, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 h-96">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">{chart.title}</h3>
                    {chart.type === 'bar' && <BarChartComponent title={chart.title} data={chart.data} dataKey={chart.dataKey} nameKey={chart.nameKey} />}
                    {chart.type === 'pie' && <PieChartComponent title={chart.title} data={chart.data} dataKey={chart.dataKey} nameKey={chart.nameKey} />}
                    {chart.type === 'line' && <LineChartComponent title={chart.title} data={chart.data} dataKey={chart.dataKey} nameKey={chart.nameKey} />}
                </div>
            ))}
            {data.tables && data.tables.map((table, index) => (
                 <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">{table.title}</h3>
                    <TableComponent title={table.title} headers={table.headers} rows={table.rows} />
                </div>
            ))}
        </div>

        {/* Side Section (History & Goals) */}
        <div className="space-y-6">
            {data.history && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Histórico de Atualizações</h3>
                    <HistoryLogComponent logs={data.history} />
                </div>
            )}
             {/* FIX: Changed component to use the 'goals' prop instead of 'data.goals'. */}
             {goals && goals.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Metas e Objetivos</h3>
                    <div className="space-y-4">
                        {/* FIX: Used goal.id for the key. */}
                        {goals.map((goal) => <GoalProgressComponent key={goal.id} goal={goal} />)}
                    </div>
                </div>
            )}
        </div>
      </div>
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title={`Relatório de ${data.title}`}
        content={reportContent}
        isLoading={isReportLoading}
        panelData={data}
      />
    </div>
  );
};

export default Dashboard;