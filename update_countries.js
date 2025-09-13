const fs = require('fs');

// Читаем файл
let content = fs.readFileSync('components/CountryDropDown.vue', 'utf8');

// Маппинг телефонных кодов на коды стран
const phoneToCountryMap = {
  '+380': 'ua', '+44': 'gb', '+49': 'de', '+33': 'fr', '+39': 'it', '+34': 'es',
  '+31': 'nl', '+48': 'pl', '+420': 'cz', '+421': 'sk', '+36': 'hu', '+40': 'ro',
  '+359': 'bg', '+30': 'gr', '+43': 'at', '+41': 'ch', '+32': 'be', '+46': 'se',
  '+47': 'no', '+45': 'dk', '+358': 'fi', '+354': 'is', '+353': 'ie', '+351': 'pt',
  '+352': 'lu', '+386': 'si', '+385': 'hr', '+387': 'ba', '+382': 'me', '+381': 'rs',
  '+383': 'xk', '+389': 'mk', '+355': 'al', '+373': 'md', '+370': 'lt', '+371': 'lv',
  '+372': 'ee', '+375': 'by', '+377': 'mc', '+378': 'sm', '+379': 'va', '+376': 'ad',
  '+423': 'li', '+350': 'gi', '+298': 'fo', '+90': 'tr', '+1': 'us', '+86': 'cn',
  '+81': 'jp', '+82': 'kr', '+91': 'in', '+55': 'br', '+52': 'mx', '+61': 'au',
  '+64': 'nz', '+27': 'za', '+20': 'eg', '+971': 'ae', '+966': 'sa', '+972': 'il'
};

// Регулярное выражение для поиска записей стран
const countryRegex = /{ code: '([^']+)', names: {[^}]+}, flag: '([^']+)', (?:countryCode: '[^']+', )?maxLength: (\d+), mask: '([^']+)' }/g;

// Заменяем каждую запись
content = content.replace(countryRegex, (match, code, flag, maxLength, mask) => {
  const countryCode = phoneToCountryMap[code] || 'us';
  return `{ code: '${code}', names: {[^}]+}, flag: '${flag}', countryCode: '${countryCode}', maxLength: ${maxLength}, mask: '${mask}' }`;
});

// Записываем обновленный файл
fs.writeFileSync('components/CountryDropDown.vue', content);

console.log('Файл обновлен успешно!');
