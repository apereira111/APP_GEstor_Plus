// FIX: Provide full implementation for the Gemini service.
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Imported ChatMessage for chatAboutReport function.
import type { PanelData, Goal, GoalSuggestion, ChatMessage } from '../types';

// FIX: Initialize GoogleGenAI client as per guidelines, assuming API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// FIX: Use allowed model name as per guidelines.
const model = 'gemini-2.5-flash';

/**
 * Generates a custom analysis based on a user prompt and specific panel data.
 */
export const generateCustomAnalysis = async (prompt: string, panelData: PanelData): Promise<string> => {
    const kpis = panelData.kpis.map(k => `- ${k.title}: ${k.value}`).join('\n');
    const charts = panelData.charts?.map(c => `- Gráfico: ${c.title}`).join('\n') || 'Nenhum gráfico disponível.';
    const tables = panelData.tables?.map(t => `- Tabela: ${t.title}`).join('\n') || 'Nenhuma tabela disponível.';

    const dataContext = `
    **Indicadores Principais (KPIs):**
    ${kpis}

    **Visualizações de Dados Disponíveis (Gráficos e Tabelas):**
    ${charts}
    ${tables}
    `;
    
    const finalPrompt = `
    Você é um especialista em análise de dados de saúde pública no Brasil. Com base nos dados fornecidos do painel de "${panelData.title}", responda à seguinte solicitação do gestor. Seja claro, objetivo, use formato markdown e forneça insights práticos.

    **Contexto de Dados do Painel "${panelData.title}":**
    ${dataContext}

    ---

    **Solicitação do Gestor:**
    "${prompt}"
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: finalPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API in generateCustomAnalysis:", error);
        throw new Error("Falha ao se comunicar com a API de IA para análise customizada.");
    }
};


/**
 * Generates a comprehensive report based on panel data.
 */
export const generateReport = async (panelData: PanelData): Promise<string> => {
     const kpis = panelData.kpis.map(k => `- ${k.title}: ${k.value} (variação: ${k.change || 'N/A'})`).join('\n');
     const prompt = `
        Gere um relatório executivo em markdown sobre a área de "${panelData.title}" com base nos seguintes dados:

        **Principais Indicadores (KPIs):**
        ${kpis}

        **Análise Solicitada:**
        1.  **Resumo Executivo:** Um parágrafo inicial que resume a situação geral da área.
        2.  **Análise dos Indicadores:** Comente sobre os principais KPIs, destacando os pontos positivos e os que precisam de atenção.
        3.  **Recomendações:** Sugira 2-3 ações práticas que um gestor de saúde poderia tomar com base nesses dados para melhorar os resultados.

        Seja claro, objetivo e use uma linguagem apropriada para um relatório gerencial.
     `;
     
     try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
     } catch(error) {
        console.error("Error calling Gemini API in generateReport:", error);
        throw new Error("Falha ao gerar o relatório com a API de IA.");
     }
};


/**
 * Suggests a realistic target for a health indicator goal.
 */
export const suggestGoalTarget = async (indicatorTitle: string, currentValue: number, unit: string, filters: object): Promise<GoalSuggestion> => {
    const prompt = `
        Aja como um consultor de saúde pública. Preciso de uma sugestão de meta para o seguinte indicador:
        - Indicador: "${indicatorTitle}"
        - Valor Atual: ${currentValue}${unit}
        - Contexto (Filtros): ${JSON.stringify(filters)}

        Sugira um valor de meta que seja ao mesmo tempo realista e ambicioso para o próximo ciclo (geralmente 1 ano).
        Forneça também uma breve justificativa para a sua sugestão, baseada em benchmarks ou boas práticas.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestedValue: { type: Type.NUMBER },
                        justification: { type: Type.STRING }
                    },
                    propertyOrdering: ["suggestedValue", "justification"]
                }
            }
        });

        let jsonStr = response.text.trim();
        // Sometimes the model might wrap the JSON in markdown backticks
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        }
        
        const suggestion = JSON.parse(jsonStr) as GoalSuggestion;
        
        // Basic validation of the parsed object
        if (typeof suggestion.suggestedValue !== 'number' || typeof suggestion.justification !== 'string') {
             throw new Error("Resposta da IA em formato inesperado.");
        }

        return suggestion;

    } catch (error) {
        console.error("Error calling Gemini API in suggestGoalTarget:", error);
        throw new Error("Falha ao obter sugestão da IA.");
    }
};

// FIX: Added missing chatAboutReport function.
/**
 * Continues a chat conversation about a generated report.
 */
export const chatAboutReport = async (
    question: string,
    panelData: PanelData,
    reportContent: string,
    history: ChatMessage[]
): Promise<string> => {

    const systemInstruction = `Você é um especialista em análise de dados de saúde pública no Brasil. 
    O usuário está fazendo perguntas sobre um relatório que você gerou. 
    Use o relatório e o histórico da conversa para responder.
    
    **Relatório Original:**
    ---
    ${reportContent}
    ---
    `;

    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: question }]});

     try {
        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction,
            }
        });
        return response.text;
     } catch(error) {
        console.error("Error calling Gemini API in chatAboutReport:", error);
        throw new Error("Falha ao se comunicar com a API de IA para o chat.");
     }
};
