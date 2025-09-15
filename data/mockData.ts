// FIX: Provide mock data for the application.
import type { Indicator, PanelData } from '../types';
import { networkPanelData } from './networkPanelData';

export const allIndicatorOptions: Indicator[] = [
  // Primary Care
  { id: 'pc-1', title: 'Atendimentos NASF', value: '1,234', description: 'Número total de atendimentos realizados pelo Núcleo de Apoio à Saúde da Família.' },
  { id: 'pc-2', title: 'Cobertura ESF', value: '82.1%', description: 'Porcentagem da população coberta pela Estratégia Saúde da Família.' },
  { id: 'pc-3', title: 'Consultas Médicas', value: '523.4M', description: 'Número de consultas médicas realizadas na atenção primária.' },
  // Financing
  { id: 'fin-1', title: 'Investimento per capita', value: 'R$ 450,70', description: 'Investimento em saúde por habitante.' },
  { id: 'fin-2', title: 'Repasse Federal', value: 'R$ 1.2B', description: 'Total de repasses do governo federal para a saúde.'},
  // Dental
  { id: 'bucal-1', title: 'Cobertura Saúde Bucal', value: '65%', description: 'Porcentagem da população com cobertura de saúde bucal.' },
  { id: 'bucal-2', title: 'Procedimentos/Paciente', value: '2.1', description: 'Média de procedimentos odontológicos por paciente atendido.' },
  { id: 'bucal-3', title: 'Equipes de Saúde Bucal', value: '152', description: 'Número de Equipes de Saúde Bucal (eSB) implantadas.' },
  // Child
  { id: 'crianca-1', title: 'Taxa de Mortalidade Infantil', value: '8.1', description: 'Taxa de mortalidade infantil por mil nascidos vivos.' },
  { id: 'crianca-2', title: 'Cobertura Vacinal (Pólio)', value: '95.2%', description: 'Porcentagem de crianças com o esquema vacinal da poliomielite completo.' },
  { id: 'crianca-3', title: 'Aleitamento Materno', value: '68%', description: 'Índice de aleitamento materno exclusivo em menores de 6 meses.' },
  // Woman
  { id: 'mulher-1', title: 'Exames de Mamografia', value: '1.5M', description: 'Número de mamografias realizadas.'},
  { id: 'mulher-2', title: 'Cobertura Papanicolau', value: '75.4%', description: 'Porcentagem do público-alvo com exame Papanicolau em dia.' },
  { id: 'mulher-3', title: 'Partos Normais', value: '48%', description: 'Percentual de partos normais em relação ao total de partos.' },
  // Chronic
  { id: 'cronicas-1', title: 'Prevalência de Hipertensão', value: '24%', description: 'Prevalência de hipertensão na população adulta.'},
  { id: 'cronicas-2', title: 'Prevalência de Diabetes', value: '12.5%', description: 'Prevalência de diabetes na população adulta.' },
  { id: 'cronicas-3', title: 'Hipertensão Controlada', value: '62%', description: 'Percentual de pacientes diagnosticados com hipertensão que estão com a pressão arterial controlada.' },
  // Dengue
  { id: 'dengue-1', title: 'Casos Confirmados', value: '1,500', description: 'Número de casos confirmados de dengue no período.'},
  { id: 'dengue-2', title: 'Taxa de Incidência', value: '350.5', description: 'Casos de dengue por 100.000 habitantes.' },
  { id: 'dengue-3', title: 'Índice LIRAa', value: '1.2%', description: 'Índice de Infestação Predial por Aedes aegypti (LIRAa).' },
  // Network
  { id: 'net-1', title: 'Total de UBS (Amostra)', value: '0', description: 'Número total de Unidades Básicas de Saúde na amostra de dados.'},
  { id: 'net-2', title: 'Cidades Atendidas (Amostra)', value: '0', description: 'Número de cidades distintas que possuem UBS na amostra.'},
  { id: 'net-3', title: 'UBS com Telefone', value: '0%', description: 'Percentual de UBS que possuem telefone cadastrado.'},
];


export const primaryCareData: PanelData = {
  id: 'atencao-primaria',
  title: 'Atenção Primária',
  kpis: [
    { id: 'pc-1', title: 'Atendimentos NASF', value: '1,234', description: 'Total de atendimentos NASF.', change: '+10%', changeType: 'increase' },
    { id: 'pc-2', title: 'Cobertura ESF', value: '82.1%', description: 'Cobertura da Estratégia Saúde da Família.', change: '+0.2%', changeType: 'increase' },
    { id: 'pc-3', title: 'Consultas Médicas', value: '523.4M', description: 'Consultas na atenção primária.', change: '-0.1%', changeType: 'decrease' },
    { id: 'pc-4', title: 'Visitas Domiciliares', value: '2.1M', description: 'Visitas realizadas por Agentes Comunitários.', change: '+3%', changeType: 'increase' }
  ],
  charts: [
    {
      title: 'Evolução de Atendimentos (Últimos 6 meses)',
      type: 'bar',
      nameKey: 'name',
      dataKey: 'Atendimentos',
      data: [
        { name: 'Jan', 'Atendimentos': 4000 },
        { name: 'Fev', 'Atendimentos': 3000 },
        { name: 'Mar', 'Atendimentos': 2000 },
        { name: 'Abr', 'Atendimentos': 2780 },
        { name: 'Mai', 'Atendimentos': 1890 },
        { name: 'Jun', 'Atendimentos': 2390 },
      ]
    }
  ],
  history: [
      { date: '2024-07-15', indicatorTitle: 'Cobertura ESF', oldValue: '81.9%', newValue: '82.1%' },
      { date: '2024-07-10', indicatorTitle: 'Consultas Médicas', oldValue: '524.1M', newValue: '523.4M' },
      { date: '2024-06-28', indicatorTitle: 'Atendimentos NASF', oldValue: '1,120', newValue: '1,234' }
  ],
  goals: [
      // FIX: Added id to goal object.
      { id: 'goal-pc-1', indicatorId: 'pc-2', indicatorTitle: 'Cobertura ESF', description: 'Aumentar a cobertura da Estratégia Saúde da Família para toda a população elegível.', currentValue: 82.1, targetValue: 90, unit: '%' },
      // FIX: Added id to goal object.
      { id: 'goal-pc-2', indicatorId: 'pc-4', indicatorTitle: 'Visitas Domiciliares', description: 'Aumentar o número de visitas domiciliares por agentes comunitários.', currentValue: 2.1, targetValue: 2.5, unit: 'M' }
  ]
};

export const financingData: PanelData = {
  id: 'financiamento',
  title: 'Financiamento',
  kpis: [
    { id: 'fin-1', title: 'Investimento per capita', value: 'R$ 450,70', description: 'Investimento em saúde por habitante.', change: '+R$ 15,20', changeType: 'increase' },
    { id: 'fin-2', title: 'Repasse Federal', value: 'R$ 1.2B', description: 'Total de repasses do governo federal.', change: '+2.5%', changeType: 'increase' },
    { id: 'fin-3', title: 'Execução Orçamentária', value: '95%', description: 'Percentual do orçamento da saúde executado.', change: '+1%', changeType: 'increase' }
  ],
  tables: [
      {
          title: 'Detalhamento de Despesas por Categoria',
          headers: ['Categoria', 'Orçado', 'Executado', '%'],
          rows: [
              ['Pessoal', 'R$ 500M', 'R$ 480M', '96%'],
              ['Investimentos', 'R$ 200M', 'R$ 180M', '90%'],
              ['Custeio', 'R$ 800M', 'R$ 780M', '97.5%'],
          ]
      }
  ]
};

export const dentalHealthData: PanelData = {
  id: 'saude-bucal',
  title: 'Saúde Bucal',
  kpis: [
    { id: 'bucal-1', title: 'Cobertura Saúde Bucal', value: '65%', description: 'Porcentagem da população com cobertura de saúde bucal.', change: '+1.5%', changeType: 'increase' },
    { id: 'bucal-2', title: 'Procedimentos/Paciente', value: '2.1', description: 'Média de procedimentos odontológicos por paciente atendido.', change: '+0.1', changeType: 'increase' },
    { id: 'bucal-3', title: 'Equipes de Saúde Bucal', value: '152', description: 'Número de Equipes de Saúde Bucal (eSB) implantadas.', change: '+5', changeType: 'increase' },
    { id: 'bucal-4', title: 'Taxa de Extração', value: '8%', description: 'Taxa de extração dentária em relação a outros procedimentos.', change: '-0.5%', changeType: 'decrease' },
  ],
  charts: [
    {
      title: 'Procedimentos Realizados',
      type: 'bar',
      nameKey: 'name',
      dataKey: 'Quantidade',
      data: [
        { name: 'Limpeza', 'Quantidade': 12000 },
        { name: 'Restauração', 'Quantidade': 9800 },
        { name: 'Extração', 'Quantidade': 2500 },
        { name: 'Canal', 'Quantidade': 1800 },
        { name: 'Prótese', 'Quantidade': 1500 },
      ]
    }
  ],
  tables: [
    {
      title: 'Cobertura por Região',
      headers: ['Região', 'População Coberta', 'População Total', 'Cobertura (%)'],
      rows: [
        ['Norte', '45.000', '60.000', '75%'],
        ['Sul', '30.000', '55.000', '54.5%'],
        ['Leste', '65.000', '90.000', '72.2%'],
        ['Oeste', '25.000', '50.000', '50%'],
      ]
    }
  ],
};

export const childHealthData: PanelData = {
  id: 'saude-da-crianca',
  title: 'Saúde da Criança',
  kpis: [
    { id: 'crianca-1', title: 'Mortalidade Infantil', value: '8.1‰', description: 'Taxa de mortalidade infantil por mil nascidos vivos.', change: '-0.2', changeType: 'decrease' },
    { id: 'crianca-2', title: 'Cobertura Vacinal (Pólio)', value: '95.2%', description: 'Porcentagem de crianças com o esquema vacinal da poliomielite completo.', change: '+0.1%', changeType: 'increase' },
    { id: 'crianca-3', title: 'Aleitamento Materno', value: '68%', description: 'Índice de aleitamento materno exclusivo em menores de 6 meses.', change: '+2%', changeType: 'increase' },
    { id: 'crianca-4', title: 'Consultas de Puericultura', value: '4.5k', description: 'Número de consultas de acompanhamento infantil.', change: '+250', changeType: 'increase' },
  ],
  charts: [
    {
      title: 'Evolução da Mortalidade Infantil (5 Anos)',
      type: 'line',
      nameKey: 'name',
      dataKey: 'Taxa',
      data: [
        { name: '2020', 'Taxa': 8.9 },
        { name: '2021', 'Taxa': 8.7 },
        { name: '2022', 'Taxa': 8.5 },
        { name: '2023', 'Taxa': 8.3 },
        { name: '2024', 'Taxa': 8.1 },
      ]
    }
  ],
  goals: [
    // FIX: Added id to goal object.
    { id: 'goal-child-1', indicatorId: 'crianca-1', indicatorTitle: 'Mortalidade Infantil', description: 'Reduzir a taxa de mortalidade infantil para abaixo de 8.0 por mil nascidos vivos.', currentValue: 8.1, targetValue: 7.9, unit: '‰' },
  ]
};

export const womanHealthData: PanelData = {
  id: 'saude-da-mulher',
  title: 'Saúde da Mulher',
  kpis: [
    { id: 'mulher-1', title: 'Exames de Mamografia', value: '1.5M', description: 'Número de mamografias realizadas.', change: '+50k', changeType: 'increase' },
    { id: 'mulher-2', title: 'Cobertura Papanicolau', value: '75.4%', description: 'Porcentagem do público-alvo com exame Papanicolau em dia.', change: '-0.3%', changeType: 'decrease' },
    { id: 'mulher-3', title: 'Partos Normais', value: '48%', description: 'Percentual de partos normais em relação ao total de partos.', change: '+1.2%', changeType: 'increase' },
    { id: 'mulher-4', title: 'Média de Consultas Pré-natal', value: '6.8', description: 'Média de consultas de pré-natal por gestante.', change: '+0.3', changeType: 'increase' },
  ],
  charts: [
    {
      title: 'Distribuição de Tipos de Parto',
      type: 'pie',
      nameKey: 'name',
      dataKey: 'value',
      data: [
        { name: 'Parto Normal', value: 480 },
        { name: 'Parto Cesárea', value: 520 },
      ]
    }
  ],
  tables: [
    {
      title: 'Cobertura de Mamografia por Faixa Etária',
      headers: ['Faixa Etária', 'População Alvo', 'Exames Realizados', 'Cobertura (%)'],
      rows: [
        ['50-59 anos', '2.1M', '1.1M', '52.4%'],
        ['60-69 anos', '1.5M', '0.9M', '60.0%'],
      ]
    }
  ]
};

export const chronicDiseasesData: PanelData = {
  id: 'doencas-cronicas',
  title: 'Doenças Crônicas',
  kpis: [
    { id: 'cronicas-1', title: 'Prevalência de Hipertensão', value: '24%', description: 'Prevalência de hipertensão na população adulta.', change: '+0.1%', changeType: 'increase' },
    { id: 'cronicas-2', title: 'Prevalência de Diabetes', value: '12.5%', description: 'Prevalência de diabetes na população adulta.', change: '+0.2%', changeType: 'increase' },
    { id: 'cronicas-3', title: 'Hipertensão Controlada', value: '62%', description: 'Percentual de pacientes diagnosticados com hipertensão que estão com a pressão arterial controlada.', change: '+1.5%', changeType: 'increase' },
    { id: 'cronicas-4', title: 'Diabetes Controlada', value: '55%', description: 'Percentual de pacientes com diabetes com hemoglobina glicada controlada.', change: '+2.1%', changeType: 'increase' },
  ],
  charts: [
    {
      title: 'Pacientes com Doença Controlada',
      type: 'bar',
      nameKey: 'name',
      dataKey: 'Percentual',
      data: [
        { name: 'Hipertensão', 'Percentual': 62 },
        { name: 'Diabetes', 'Percentual': 55 },
      ]
    }
  ],
  history: [
      { date: '2024-07-01', indicatorTitle: 'Hipertensão Controlada', oldValue: '60.5%', newValue: '62%' },
      { date: '2024-06-15', indicatorTitle: 'Diabetes Controlada', oldValue: '52.9%', newValue: '55%' },
  ]
};

export const dengueData: PanelData = {
  id: 'vigilancia-dengue',
  title: 'Vigilância (Dengue)',
  kpis: [
    { id: 'dengue-1', title: 'Casos Confirmados', value: '1,500', description: 'Número de casos confirmados de dengue no período.', change: '-150', changeType: 'decrease' },
    { id: 'dengue-2', title: 'Taxa de Incidência', value: '350.5', description: 'Casos de dengue por 100.000 habitantes.', change: '-20.1', changeType: 'decrease' },
    { id: 'dengue-3', title: 'Índice LIRAa', value: '1.2%', description: 'Índice de Infestação Predial por Aedes aegypti (LIRAa).', change: '+0.2%', changeType: 'increase' },
    { id: 'dengue-4', title: 'Casos Graves', value: '25', description: 'Número de casos graves ou com sinais de alarme.', change: '-5', changeType: 'decrease' },
  ],
  charts: [
    {
      title: 'Série Histórica de Casos (Últimas 12 Semanas)',
      type: 'line',
      nameKey: 'name',
      dataKey: 'Casos',
      data: [
        { name: 'S-12', 'Casos': 210 }, { name: 'S-11', 'Casos': 250 }, { name: 'S-10', 'Casos': 300 },
        { name: 'S-9', 'Casos': 280 }, { name: 'S-8', 'Casos': 240 }, { name: 'S-7', 'Casos': 220 },
        { name: 'S-6', 'Casos': 180 }, { name: 'S-5', 'Casos': 160 }, { name: 'S-4', 'Casos': 140 },
        { name: 'S-3', 'Casos': 120 }, { name: 'S-2', 'Casos': 100 }, { name: 'S-1', 'Casos': 90 },
      ]
    }
  ],
  tables: [
    {
      title: 'Casos por Região (Último Mês)',
      headers: ['Região', 'Casos Confirmados', 'População', 'Incidência (/100k)'],
      rows: [
        ['Norte', '450', '60.000', '750.0'],
        ['Sul', '200', '55.000', '363.6'],
        ['Leste', '600', '90.000', '666.7'],
        ['Oeste', '250', '50.000', '500.0'],
      ]
    }
  ],
};

export const allPanelData: Record<string, PanelData> = {
    'atencao-primaria': primaryCareData,
    'financiamento': financingData,
    'saude-bucal': dentalHealthData,
    'rede-de-atendimento': networkPanelData, // Added new panel
    'saude-da-crianca': childHealthData,
    'saude-da-mulher': womanHealthData,
    'doencas-cronicas': chronicDiseasesData,
    'vigilancia-dengue': dengueData,
};
