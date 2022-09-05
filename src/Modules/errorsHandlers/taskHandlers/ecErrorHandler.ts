import { toast } from 'react-toastify';
import { ContextGoSyntax } from '../../../Providers/ContextProvider';

const EMPTY_EMAIL = (context: ContextGoSyntax) => {
  const email = context.taskConfigs.enhancedConversions?.ecFieldsData.email;

  if (!email) {
    toast.error(
      'O campo de seletor CSS de e-mail é obrigatório para Enhanced Conversion'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

const PHONE_BUT_NO_AREA = (context: ContextGoSyntax) => {
  const phone =
    context.taskConfigs.enhancedConversions?.ecFieldsData.phone?.number;
  const area =
    context.taskConfigs.enhancedConversions?.ecFieldsData.phone?.area_code;

  if ((phone && !area) || (area && !phone)) {
    toast.error(
      'Os campos Phone Number e Code Area devem estar preenchidos em conjunto ou ambos devem estar vazios.'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

const CONVERSION_VALUE_VALIDATION = (context: ContextGoSyntax) => {
  const enhancedConversionType =
    context.taskConfigs.enhancedConversions?.enhancedConversionType;

  const enhancedConversionValue =
    context.taskConfigs.enhancedConversions?.ecPurchaseData
      ?.enhancedConversionValue;

  if (enhancedConversionType === 'with-value' && !enhancedConversionValue) {
    toast.error(
      'Para o tipo de conversão com valor, o campo de seletor CSS do valor deve ser preenchido'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

const URL_FILTER_VALIDATION = (context: ContextGoSyntax) => {
  if (
    context?.taskConfigs.enhancedConversions?.ecUrlFilterSwitch &&
    !context?.taskConfigs.enhancedConversions?.ecUrlFilterProps?.ecUrlFilterText
  ) {
    toast.error(
      'Para usar o filtro de URL, o campo de texto da procura deve ser preenchido'
    );
    return { hasError: true };
  }
  return { hasError: false };
};

export default [
  EMPTY_EMAIL,
  PHONE_BUT_NO_AREA,
  CONVERSION_VALUE_VALIDATION,
  URL_FILTER_VALIDATION,
];
