import { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';
import { maskCurrencyInput, maskWhatsApp } from '../utils/masks';

export function LoanForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    valorRaw: '',
    valorFormatado: '',
    taxa: '',
    dataInicial: new Date().toISOString().split('T')[0],
    whatsappRaw: '',
    whatsappFormatado: ''
  });

  const handleValorChange = (e) => {
    const { raw, formatted } = maskCurrencyInput(e.target.value);
    setFormData(prev => ({ 
      ...prev, 
      valorRaw: raw, 
      valorFormatado: formatted 
    }));
  };

  const handleWhatsappChange = (e) => {
    const { raw, formatted } = maskWhatsApp(e.target.value);
    setFormData(prev => ({
      ...prev,
      whatsappRaw: raw,
      whatsappFormatado: formatted
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.valorRaw || !formData.taxa || !formData.dataInicial || !formData.whatsappRaw) {
      return; // Basic validation
    }

    onSubmit({
      valor: Number(formData.valorRaw),
      taxa: Number(formData.taxa),
      dataInicial: formData.dataInicial,
      whatsapp: formData.whatsappRaw // Only digits extracted
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Valor do Empréstimo (R$)
        </label>
        <input
          type="text"
          required
          placeholder="R$ 0,00"
          value={formData.valorFormatado}
          onChange={handleValorChange}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Taxa de Juros Total (%)
        </label>
        <input
          name="taxa"
          type="number"
          step="0.01"
          required
          placeholder="Ex: 20"
          value={formData.taxa}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Data Inicial
        </label>
        <input
          name="dataInicial"
          type="date"
          required
          value={formData.dataInicial}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all text-slate-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          WhatsApp (com DDD)
        </label>
        <input
          type="tel"
          required
          placeholder="(11) 99999-9999"
          value={formData.whatsappFormatado}
          onChange={handleWhatsappChange}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-slate-400"
        />
        <p className="text-xs text-slate-500 mt-1">Apenas números serão enviados.</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-brand-blue hover:bg-brand-dark text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Calculator className="w-5 h-5" />
        )}
        {isLoading ? 'Calculando...' : 'Gerar Cronograma'}
      </button>
    </form>
  );
}
