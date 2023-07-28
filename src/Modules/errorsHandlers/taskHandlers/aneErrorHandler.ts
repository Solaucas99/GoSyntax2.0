import { toast } from 'react-toastify';
import { ContextGoSyntax } from '../../../Providers/ContextProvider';

const NO_EVENT_NAME = (context: ContextGoSyntax) => {
  const aneEventName = context.taskConfigs.analyticsEvent?.aneEventName;

  if (!aneEventName) {
    toast.error('O nome do evento deve estar preenchido!');
    return { hasError: true };
  }

  return { hasError: false };
};

const PARAMETERS_WITHOUT_KEY_VALUE = (context: ContextGoSyntax) => {
  const aneParameters = context.taskConfigs.analyticsEvent?.aneParameters;

  if (
    aneParameters &&
    aneParameters.length > 0 &&
    aneParameters.some(value => value.key === '' || value.value === '')
  ) {
    toast.error('O evento com parâmetros deve ter chave e valor preenchidas');
    return { hasError: true };
  }

  return { hasError: false };
};

const PARAMETERS_WITH_SAME_KEY = (context: ContextGoSyntax) => {
  const aneParameters = context.taskConfigs.analyticsEvent?.aneParameters;

  if (aneParameters && aneParameters.length > 0) {
    const aneParametersMap = aneParameters.map(value => value.key);

    if (aneParametersMap.length !== new Set(aneParametersMap).size) {
      toast.error('O evento com parâmetros não pode ter chaves duplicadas');
      return { hasError: true };
    }

    return { hasError: false };
  }

  return { hasError: false };
};

export default [
  NO_EVENT_NAME,
  PARAMETERS_WITHOUT_KEY_VALUE,
  PARAMETERS_WITH_SAME_KEY,
];
