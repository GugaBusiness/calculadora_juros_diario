import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { LoanForm } from './components/LoanForm';
import { ResultsArea } from './components/ResultsArea';

function App() {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loanRequest, setLoanRequest] = useState(null);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setLoanRequest(data); // Save the request data for the WhatsApp message
    try {
      const payload = {
        valor_emprestado: data.valor,
        taxa_juros: data.taxa,
        data_inicial: data.dataInicial,
        whatsapp: data.whatsapp
      };

      const response = await axios.post(
        'https://nucleo-n8n-webhook.mu1hev.easypanel.host/webhook/calcula_juros_diario',
        payload
      );
      
      setResultData(response.data);
      toast.success('Cronograma gerado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao gerar o cronograma. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResultData(null);
    setLoanRequest(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-brand-dark text-white py-6 shadow-md z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center gap-3">
          <div className="bg-brand-accent p-2 rounded-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Cálculo de Juros</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column / Top Row - Form */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Simulador de Empréstimo</h2>
              <p className="text-slate-500 text-sm mt-1">Preencha os dados para gerar o cronograma diário.</p>
            </div>
            
            <LoanForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Right Column / Bottom Row - Results */}
          <div className="lg:col-span-7">
            {resultData ? (
              <ResultsArea 
                resultData={resultData} 
                loanRequest={loanRequest} 
                onReset={handleReset}
              />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-100/50 rounded-2xl border border-slate-200 border-dashed p-8 text-center">
                <Building2 className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhum cálculo realizado</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Preencha o formulário ao lado e clique em "Gerar Cronograma" para visualizar os resultados e a tabela de pagamentos.
                </p>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
