import { EditorView } from 'codemirror';

import { ContextGoSyntax } from '../../Providers/ContextProvider';

function getCurrencyPrice(currency: string, price: string) {
  if (currency === 'BRL') {
    return `Number(${price}.replace('R$', '').replace('.', '').replace(',', '.'))`;
  }

  if (currency === 'USD') {
    return `Number(${price}.replace('USD', '').replace('.', '').replace(',', '.'))`;
  }

  return ``;
}

const ADS_CONVERSION_CODE = (context: ContextGoSyntax, cmView: EditorView) => {
  if (
    context.taskConfigs?.adsConversionCode?.accConversionType === 'no-value'
  ) {
    const code = `gtag('event', 'conversion', {'send_to': 'AW-${context.taskConfigs?.adsConversionCode?.accConversionId}/${context.taskConfigs?.adsConversionCode?.accConversionLabel}',  });`;
    return {
      changes: [
        {
          from: Math.floor(cmView.state.doc.lines / 2) - 1,
          insert: code,
        },
      ],
    };
  }

  if (
    context.taskConfigs?.adsConversionCode?.accConversionType === 'with-value'
  ) {
    const code = `gtag('event', 'conversion', {
      'send_to': 'AW-${
        context.taskConfigs?.adsConversionCode?.accConversionId
      }/${context.taskConfigs?.adsConversionCode?.accConversionLabel}',
      'value': ${getCurrencyPrice(
        context.taskConfigs?.adsConversionCode?.accConversionCurrency,
        `document.querySelector('${context.taskConfigs?.adsConversionCode?.accConversionValue}').innerText`
      )},
      'currency': '${
        context.taskConfigs?.adsConversionCode?.accConversionCurrency
      }',
      'transaction_id': document.querySelector('${
        context.taskConfigs?.adsConversionCode?.accConversionTransactionId
      }').innerText.replace(/\\D+/g, '')
  });`;
    return {
      changes: [
        {
          from: Math.floor(cmView.state.doc.lines / 2) - 1,
          insert: code,
        },
      ],
    };
  }

  return { changes: [] };
};

export default [ADS_CONVERSION_CODE];
