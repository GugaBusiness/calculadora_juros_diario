import { RefreshCcw, Landmark, Percent, CalendarDays, Wallet } from 'lucide-react';
import { formatCurrency, formatDateExt } from '../utils/formatters';
import { SummaryCard } from './ui/SummaryCard';

export function ResultsArea({ resultData, loanRequest, onReset }) {
  // Defensive values based on expected API response or Form Request
  const capital = resultData?.capital_inicial || resultData?.valor_emprestado || loanRequest?.valor || 0;
  const taxa = resultData?.taxa_aplicada || resultData?.taxa_juros || loanRequest?.taxa || 0;
  
  const calcTotal = capital * (1 + (taxa / 100));
  const total = resultData?.total_pagar || resultData?.total || calcTotal;
  
  const cronograma = resultData?.cronograma_pagamento || resultData?.cronograma || [];
  const qtdDias = resultData?.quantidade_dias || cronograma.length || 0;
  
  const calcValorDiario = qtdDias > 0 ? (total / qtdDias) : 0;
  const valorDiario = resultData?.valor_diario || calcValorDiario;

  const handleWhatsAppClick = () => {
    let msg = `*RESUMO DE EMPRÉSTIMO*\n\n`;
    msg += `*Valor Empréstimo:* ${formatCurrency(capital)}\n`;
    msg += `*Total a Pagar:* ${formatCurrency(total)}\n`;
    msg += `*Parcelas:* ${qtdDias}x de ${formatCurrency(valorDiario)}\n\n`;
    msg += `*CRONOGRAMA DE PAGAMENTO:*\n`;
    
    cronograma.forEach((item, index) => {
      let dataFormatada = formatDateExt(item.data_vencimento || item.data);
      
      const v = item.valor || valorDiario;
      const parcelaNum = item.parcela || index + 1;
      
      msg += `- ${parcelaNum}ª Parcela: ${dataFormatada} - ${formatCurrency(v)}\n`;
    });

    msg += `\n*DADOS PARA PAGAMENTO (PIX):*\n`;
    msg += `Chave PIX: 63.054.273/0001-39\n`;
    msg += `Beneficiário: Luciana Cordeiro Barbosa\n`;

    const link = `https://wa.me/55${loanRequest.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Resultado da Simulação</h2>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" /> Refazer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Valor Emprestado" 
          value={formatCurrency(capital)} 
          icon={<Landmark className="w-5 h-5 text-blue-500" />} 
        />
        <SummaryCard 
          title="Taxa Aplicada" 
          value={`${taxa}%`} 
          icon={<Percent className="w-5 h-5 text-amber-500" />} 
        />
        <SummaryCard 
          title="Total a Pagar" 
          value={formatCurrency(total)} 
          highlight 
          icon={<Wallet className="w-5 h-5 text-emerald-500" />} 
        />
        <SummaryCard 
          title="Dias" 
          value={qtdDias} 
          icon={<CalendarDays className="w-5 h-5 text-purple-500" />} 
        />
      </div>

      {/* WhatsApp Button */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-medium text-slate-800">Enviar para o Cliente</h3>
          <p className="text-sm text-slate-500">Envie o cronograma completo diretamente no WhatsApp.</p>
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#25D366]/20"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Enviar Cobrança 🚀
        </button>
      </div>

      {/* Schedule Table */}
      {cronograma.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Parcela</th>
                  <th className="px-6 py-4">Data de Vencimento</th>
                  <th className="px-6 py-4 text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cronograma.map((item, index) => {
                  let dateStr = formatDateExt(item.data_vencimento || item.data);

                  const v = item.valor || valorDiario;
                  const num = item.parcela || index + 1;

                  return (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {num}ª Parcela
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {dateStr}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-800">
                        {formatCurrency(v)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
