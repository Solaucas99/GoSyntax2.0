import { toast } from 'react-toastify';
import { ContextGoSyntax } from '../../../Providers/ContextProvider';

const NOTHING_SELECTED = (context: ContextGoSyntax) => {
  const accConversionId =
    context.taskConfigs.adsConversionCode?.accConversionId;

  const accConversionLabel =
    context.taskConfigs.adsConversionCode?.accConversionLabel;

  if (!accConversionId || !accConversionLabel) {
    toast.error('Conversion ID e Conversion Label devem estar preenchidos');
    return { hasError: true };
  }

  return { hasError: false };
};

const CONVERSION_VALUE_VALIDATION = (context: ContextGoSyntax) => {
  const accConversionType =
    context.taskConfigs.adsConversionCode?.accConversionType;

  const accConversionValue =
    context.taskConfigs.adsConversionCode?.accConversionValue;

  if (accConversionType === 'with-value' && !accConversionValue) {
    toast.error(
      'Para o tipo de conversão com valor, o campo de seletor CSS do valor deve ser preenchido'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

export default [NOTHING_SELECTED, CONVERSION_VALUE_VALIDATION];
