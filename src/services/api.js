import axios from 'axios';

const WEBHOOK_URL = import.meta.env.VITE_API_WEBHOOK_URL || 'https://nucleo-n8n-webhook.mu1hev.easypanel.host/webhook/calcula_juros_diario';

export const generateLoanSchedule = async (data) => {
  const payload = {
    valor_emprestado: data.valor,
    taxa_juros: data.taxa,
    data_inicial: data.dataInicial,
    whatsapp: data.whatsapp
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Ocorreu um erro ao gerar o cronograma. Tente novamente mais tarde.');
  }
};
