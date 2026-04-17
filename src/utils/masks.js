export const maskCurrencyInput = (value) => {
  const onlyDigits = value.replace(/\D/g, '');
  if (onlyDigits === '') {
    return { raw: '', formatted: '' };
  }
  const numericValue = parseInt(onlyDigits, 10) / 100;
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);

  return { raw: numericValue, formatted: formattedValue };
};

export const maskWhatsApp = (value) => {
  let onlyDigits = value.replace(/\D/g, '');
  let formatted = onlyDigits;
  
  if (onlyDigits.length <= 11) {
    formatted = onlyDigits.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
    if (onlyDigits.length > 2 && onlyDigits.length < 7) {
      formatted = `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2)}`;
    } else if (onlyDigits.length >= 7 && onlyDigits.length <= 11) {
      // Dynamic logic handling when typing the last digits
      formatted = `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2, onlyDigits.length - 4)}-${onlyDigits.slice(onlyDigits.length - 4)}`;
    }
  } else {
    // Keep max 11 chars
    onlyDigits = onlyDigits.slice(0, 11);
    formatted = onlyDigits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  return { raw: onlyDigits, formatted };
};
