// data/networkPanelData.ts
import type { PanelData } from '../types';
import { ubsApiMockResponse } from './ubsApiMock';

// --- KPI Calculation ---
const totalUbs = ubsApiMockResponse.length;
const cities = new Set(ubsApiMockResponse.map(ubs => ubs.cidade));
const ubsWithPhone = ubsApiMockResponse.filter(ubs => ubs.telefone).length;
const phoneCoverage = totalUbs > 0 ? ((ubsWithPhone / totalUbs) * 100).toFixed(1) : '0.0';

// --- Table Data Generation ---
const tableRows = ubsApiMockResponse.map(ubs => [
    ubs.nomeFantasia,
    `${ubs.logradouro}`,
    ubs.bairro,
    `${ubs.cidade}/${ubs.uf}`,
    ubs.telefone || 'Não informado',
]);

// --- PanelData Object Definition ---
export const networkPanelData: PanelData = {
  id: 'rede-de-atendimento',
  title: 'Rede de Atendimento (UBS)',
  kpis: [
    { 
        id: 'net-1', 
        title: 'Total de UBS (Amostra)', 
        value: totalUbs.toString(), 
        description: 'Número total de Unidades Básicas de Saúde na amostra de dados carregada.',
        change: '+2',
        changeType: 'increase',
    },
    { 
        id: 'net-2', 
        title: 'Cidades Atendidas (Amostra)', 
        value: cities.size.toString(), 
        description: 'Número de cidades distintas que possuem UBS na amostra de dados.',
        change: '0',
    },
    { 
        id: 'net-3', 
        title: 'UBS com Telefone', 
        value: `${phoneCoverage}%`, 
        description: 'Percentual de Unidades Básicas de Saúde que possuem um número de telefone cadastrado.',
        change: '-5%',
        changeType: 'decrease',
    },
     { 
        id: 'net-4', 
        title: 'Média UBS/Cidade (Amostra)', 
        value: (totalUbs / cities.size).toFixed(1), 
        description: 'Média de Unidades Básicas de Saúde por cidade na amostra de dados.',
        change: '+0.1',
        changeType: 'increase',
    }
  ],
  tables: [
      {
          title: 'Lista de Unidades Básicas de Saúde (Amostra)',
          headers: ['Nome Fantasia', 'Endereço', 'Bairro', 'Cidade/UF', 'Telefone'],
          rows: tableRows
      }
  ]
};
