import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Lightbulb, Loader } from './icons';
import { generateCustomAnalysis } from '../services/geminiService';
import { fetchAllPanels, fetchPanelData } from '../services/dataService';

const examplePrompts = [
    "Qual o principal desafio na Atenção Primária com base nos KPIs?",
    "Compare a evolução dos casos de Dengue com o índice LIRAa.",
    "Sugira 3 ações para melhorar a saúde da mulher com base nos dados."
];

const InsightFinder: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedPanelId, setSelectedPanelId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    
    const [panels, setPanels] = useState<{ id: string, title: string }[]>([]);
    const [isPanelsLoading, setIsPanelsLoading] = useState(true);

    useEffect(() => {
        fetchAllPanels()
            .then(panelList => {
                setPanels(panelList);
            })
            .catch(err => {
                console.error("Failed to load panels", err);
                setError("Falha ao carregar a lista de painéis.");
            })
            .finally(() => {
                 setIsPanelsLoading(false);
            });
    }, []);

    const handleSearch = async () => {
        if (!prompt || !selectedPanelId) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const panelData = await fetchPanelData(selectedPanelId);
            const insightResult = await generateCustomAnalysis(prompt, panelData);
            setResult(insightResult);
        } catch (err) {
            setError('Ocorreu um erro ao gerar a análise. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleExampleClick = (example: string) => {
        setPrompt(example);
    };

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            <header className="text-center">
                 <h2 className="text-3xl font-bold text-gray-800">Gere Relatórios e Análises com IA</h2>
                 <p className="mt-2 text-gray-600">Faça perguntas em linguagem natural sobre os dados de um painel específico para obter insights detalhados.</p>
            </header>

            {/* Input Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                {/* Panel Selector */}
                <div>
                    <label htmlFor="panel-select" className="block text-sm font-medium text-gray-700 mb-1">
                        1. Selecione o Contexto de Dados (Painel)
                    </label>
                    <select
                        id="panel-select"
                        value={selectedPanelId}
                        onChange={(e) => setSelectedPanelId(e.target.value)}
                        className="w-full h-11 pl-3 pr-6 text-base placeholder-gray-600 border border-gray-300 rounded-lg appearance-none focus:shadow-outline"
                        disabled={isPanelsLoading}
                    >
                        <option value="" disabled>{isPanelsLoading ? 'Carregando painéis...' : 'Selecione um painel...'}</option>
                        {panels.map(panel => (
                            <option key={panel.id} value={panel.id}>{panel.title}</option>
                        ))}
                    </select>
                </div>
                
                {/* Prompt Textarea */}
                <div>
                    <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 mb-1">
                        2. Descreva o que você quer analisar
                    </label>
                    <textarea
                        id="prompt-input"
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ex: Quais são as principais tendências nos dados de financiamento?"
                        className="w-full p-3 text-base placeholder-gray-500 border border-gray-300 rounded-lg focus:shadow-outline"
                    />
                </div>

                {/* Example Prompts */}
                <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-2">Ou tente um exemplo:</p>
                    <div className="flex flex-wrap gap-2">
                        {examplePrompts.map((example, i) => (
                             <button
                                key={i}
                                onClick={() => handleExampleClick(example)}
                                className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSearch}
                        disabled={!prompt || !selectedPanelId || isLoading}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                       <Lightbulb className="w-5 h-5" />
                       Analisar
                    </button>
                </div>
            </div>

            {/* Result Area */}
            <div className="mt-8 pt-6">
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                        <Loader className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-semibold">Analisando...</p>
                        <p className="text-sm">Gerando relatório com base no seu prompt...</p>
                    </div>
                )}
                 {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
                        {error}
                    </div>
                )}
                 {result && !isLoading && (
                     <div className="bg-white border rounded-xl shadow-sm p-6">
                        {/* FIX: Wrapped ReactMarkdown in a div to apply tailwind prose classes correctly. */}
                        <div className="prose prose-sm max-w-none prose-headings:font-semibold">
                            <ReactMarkdown>
                                {result}
                            </ReactMarkdown>
                        </div>
                    </div>
                 )}
                 {!isLoading && !result && !error && (
                    <div className="text-center text-gray-500 py-10 border-2 border-dashed rounded-lg">
                        <p className="font-semibold">Sua análise detalhada aparecerá aqui.</p>
                        <p className="text-sm mt-1">Preencha os campos acima para começar.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default InsightFinder;
