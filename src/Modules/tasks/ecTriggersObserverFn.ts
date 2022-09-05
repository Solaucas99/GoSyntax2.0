import { EditorView } from 'codemirror';

import { ContextGoSyntax } from '../../Providers/ContextProvider';

const ENHANCED_CONVERSIONS = (context: ContextGoSyntax, cmView: EditorView) => {
  const ecType =
    context.taskConfigs.enhancedConversions?.enhancedConversionType;

  const ecPurchaseData =
    context.taskConfigs.enhancedConversions?.ecPurchaseData;

  const ecPhone =
    context.taskConfigs.enhancedConversions?.ecFieldsData.phone?.number;

  if (ecType === 'no-value') {
    const code = `
      dataLayer.push({
        event: 'enhanced_conversion_form',
        email: enhanced_conversion_data.email,
        ${ecPhone ? 'phone_number: enhanced_conversion_data.phone_number,' : ''}
      })
    `;

    return {
      changes: [
        {
          from: Math.floor(cmView.state.doc.lines / 2) - 1,
          insert: code,
        },
      ],
    };
  }

  if (ecType === 'with-value') {
    const code = `
      dataLayer.push({
        event: 'enhanced_conversion_form',
        email: enhanced_conversion_data.email,
        ${ecPhone ? 'phone_number: enhanced_conversion_data.phone_number,' : ''}
        purchaseData: {
          price: ${ecPurchaseData?.enhancedConversionValue},
          ${
            ecPurchaseData?.enhancedConversionTransactionId
              ? `transaction_id: ${ecPurchaseData?.enhancedConversionTransactionId},`
              : ''
          }
          currency: '${ecPurchaseData?.enhancedConversionCurrency}'
        }
      })
    `;

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

export default [ENHANCED_CONVERSIONS];
