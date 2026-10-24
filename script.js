const currencies = {
  BRL: {
    label: 'Real',
    symbol: 'R$',
    icon: './assets/real.png',
    toBRL: 1,
  },
  USD: {
    label: 'Dólar',
    symbol: 'US$',
    icon: './assets/dolar.png',
    toBRL: 4.97,
  },
  EUR: {
    label: 'Euro',
    symbol: '€',
    icon: './assets/euro.png',
    toBRL: 5.58,
  },
  GBP: {
    label: 'Libra',
    symbol: '£',
    icon: './assets/libra.png',
    toBRL: 6.64,
  },
  ARS: {
    label: 'Peso',
    symbol: 'AR$',
    icon: './assets/peso.png',
    toBRL: 0.0033,
  },
  BTC: {
    label: 'Bitcoin',
    symbol: '₿',
    icon: './assets/bitcoin.png',
    toBRL: 399978.69,
  },
};

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertButton = document.querySelector('button');
const sourceIcon = document.getElementById('source-icon');
const targetIcon = document.getElementById('target-icon');
const sourceName = document.getElementById('source-name');
const targetName = document.getElementById('target-name');
const sourceValue = document.getElementById('source-value');
const targetValue = document.getElementById('target-value');

function formatCurrency(value, currencyCode) {
  const currency = currencies[currencyCode];
  const formatOptions = {
    style: 'currency',
    currency: currencyCode === 'BTC' ? 'USD' : currencyCode,
    minimumFractionDigits: currencyCode === 'BTC' ? 6 : 2,
    maximumFractionDigits: currencyCode === 'BTC' ? 6 : 2,
  };

  try {
    return new Intl.NumberFormat('pt-BR', formatOptions).format(value);
  } catch (error) {
    return `${currency.symbol} ${value.toFixed(currencyCode === 'BTC' ? 6 : 2)}`;
  }
}

function convertCurrency(amount, fromCode, toCode) {
  const amountInBRL = amount * currencies[fromCode].toBRL;
  return amountInBRL / currencies[toCode].toBRL;
}

function updateCurrencyPreview() {
  const fromCode = fromCurrency.value;
  const toCode = toCurrency.value;

  const fromInfo = currencies[fromCode];
  const toInfo = currencies[toCode];

  sourceIcon.src = fromInfo.icon;
  sourceIcon.alt = `moeda-${fromCode}`;
  sourceName.textContent = `${fromInfo.label} (${fromCode})`;

  targetIcon.src = toInfo.icon;
  targetIcon.alt = `moeda-${toCode}`;
  targetName.textContent = `${toInfo.label} (${toCode})`;

  const numericAmount = Number(amountInput.value) || 0;
  const convertedValue = convertCurrency(numericAmount, fromCode, toCode);

  sourceValue.textContent = formatCurrency(numericAmount, fromCode);
  targetValue.textContent = formatCurrency(convertedValue, toCode);
}

fromCurrency.addEventListener('change', updateCurrencyPreview);
toCurrency.addEventListener('change', updateCurrencyPreview);
amountInput.addEventListener('input', updateCurrencyPreview);
convertButton.addEventListener('click', updateCurrencyPreview);



updateCurrencyPreview();
