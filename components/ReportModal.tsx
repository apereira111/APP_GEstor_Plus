import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Loader, Printer, Send } from './icons';
import { chatAboutReport } from '../services/geminiService';
import type { PanelData, ChatMessage } from '../types';

// Chat Component defined within the modal file to keep changes self-contained.
const ChatComponent: React.FC<{ panelData: PanelData; reportContent: string }> = ({ panelData, reportContent }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: 'Olá! Como posso ajudar a analisar este relatório?' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isChatLoading, setChatLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isChatLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        const question = userInput;
        setUserInput('');
        setChatLoading(true);

        try {
            const history = newMessages.slice(0, -1);
            const response = await chatAboutReport(question, panelData, reportContent, history);
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: 'Desculpe, não consegui processar a resposta.' }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 h-full flex flex-col border-l border-gray-200">
            <header className="p-4 border-b bg-white">
                <h4 className="font-semibold text-gray-800">Chat de Análise com IA</h4>
                <p className="text-xs text-gray-500">Faça perguntas sobre o relatório.</p>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>
                            {/* FIX: Wrapped ReactMarkdown in a div to apply tailwind prose classes correctly. */}
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isChatLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs rounded-xl px-4 py-2 bg-white text-gray-800 border flex items-center gap-2">
                           <Loader className="w-4 h-4 animate-spin" />
                           <span className="text-sm text-gray-500">Analisando...</span>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
                <div className="relative">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Sua pergunta aqui..."
                        className="w-full pr-12 pl-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        disabled={isChatLoading}
                    />
                    <button type="submit" disabled={isChatLoading || !userInput.trim()} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">
                        <Send className="w-5 h-5"/>
                    </button>
                </div>
            </form>
        </div>
    );
};


interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
  panelData?: PanelData;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, title, content, isLoading, panelData }) => {
  if (!isOpen) {
    return null;
  }

  const handlePrint = () => {
    const reportHTML = document.getElementById('report-content-area')?.innerHTML;
    if (reportHTML) {
      const printWindow = window.open('', '_blank', 'height=800,width=800');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${title}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @page { size: auto; margin: 20mm; }
                body { padding: 1rem; }
                .prose { max-width: 100% !important; }
              </style>
            </head>
            <body>
              <h1 class="text-3xl font-bold mb-4 border-b pb-2">${title}</h1>
              <article class="prose prose-sm lg:prose-base">${reportHTML}</article>
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                  }, 300); // Small delay for rendering
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 no-print" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/* Report Content */}
            <div className="overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <Loader className="w-10 h-10 animate-spin mb-4" />
                  <p className="font-semibold">Gerando relatório com IA...</p>
                  <p className="text-sm">Isso pode levar alguns segundos.</p>
                </div>
              ) : (
                 <div id="report-content-area" className="prose prose-sm max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                 </div>
              )}
            </div>

             {/* Chat Section */}
             <aside className="h-full overflow-hidden hidden md:flex md:flex-col">
                 { !isLoading && panelData && <ChatComponent panelData={panelData} reportContent={content} /> }
             </aside>
        </main>
        
        <footer className="p-4 bg-gray-50 border-t rounded-b-xl flex justify-between items-center">
            <p className="text-xs text-gray-500">Relatório gerado por IA. Verifique as informações.</p>
            <div className="flex gap-2">
                <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-colors border">
                    <Printer className="w-4 h-4"/>
                    Imprimir Relatório
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-colors border">
                    <Printer className="w-4 h-4"/>
                    Salvar como PDF
                </button>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default ReportModal;