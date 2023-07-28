import { toast } from 'react-toastify';
import { ContextGoSyntax } from '../../../Providers/ContextProvider';

const NO_PARAMETERS = (context: ContextGoSyntax) => {
  const dlpParameters = context.taskConfigs.dataLayerPush?.dlpParameters;

  if (!dlpParameters || dlpParameters.length <= 0) {
    toast.error(
      'Para gerar um evento de dataLayer.push você deve adicionar os parâmetros personalizados'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

const PARAMETERS_WITHOUT_KEY_VALUE = (context: ContextGoSyntax) => {
  const dlpParameters = context.taskConfigs.dataLayerPush?.dlpParameters;

  if (
    dlpParameters &&
    dlpParameters.length > 0 &&
    dlpParameters.some(value => value.key === '' || value.value === '')
  ) {
    toast.error(
      'O evento de dataLayer.push com parâmetros adicionados deve ter os campos de chave e valor dos parâmetros preenchidos'
    );
    return { hasError: true };
  }

  return { hasError: false };
};

const PARAMETERS_WITH_SAME_KEY = (context: ContextGoSyntax) => {
  const dlpParameters = context.taskConfigs.dataLayerPush?.dlpParameters;

  if (dlpParameters && dlpParameters.length > 0) {
    const aneParametersMap = dlpParameters.map(value => value.key);

    if (aneParametersMap.length !== new Set(aneParametersMap).size) {
      toast.error(
        'O evento de dataLayer.push com parâmetros não pode ter chaves duplicadas'
      );
      return { hasError: true };
    }

    return { hasError: false };
  }

  return { hasError: false };
};

export default [
  NO_PARAMETERS,
  PARAMETERS_WITHOUT_KEY_VALUE,
  PARAMETERS_WITH_SAME_KEY,
];
