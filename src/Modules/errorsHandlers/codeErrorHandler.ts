import { toast } from 'react-toastify';
import { ContextGoSyntax } from '../../Providers/ContextProvider';

const NOTHING_SELECTED = (context: ContextGoSyntax) => {
  if (
    context?.codeConfigs?.triggerProps.triggerType === 'no-event' &&
    !context?.codeConfigs?.domReadySwitch &&
    !context?.codeConfigs?.urlFilterSwitch
  ) {
    toast.error('Nenhum campo de código foi acionado!');
    return { hasError: true };
  }
  return { hasError: false };
};

const JS_EVENTS_VALIDATION = (context: ContextGoSyntax) => {
  if (
    (context?.codeConfigs?.triggerProps.triggerType === 'array-js-event' ||
      context?.codeConfigs?.triggerProps.triggerType === 'one-js-event') &&
    !context?.codeConfigs?.triggerProps.jsEventCSSTarget
  ) {
    toast.error(
      'Para gerar o código do evento de JavaScript, você deve inserir o seletor CSS do alvo do evento'
    );
    return { hasError: true };
  }
  return { hasError: false };
};

const CUSTOM_MESSAGE_VALIDATION = (context: ContextGoSyntax) => {
  if (
    context?.codeConfigs?.triggerProps.triggerType === 'custom-message' &&
    !context?.codeConfigs?.triggerProps.customMessageProps.customMessageText
  ) {
    toast.error(
      'Para gerar o código de Mensagem Personalizada, você deve inserir o texto que será procurado no HTML da página'
    );
    return { hasError: true };
  }
  return { hasError: false };
};

const URL_FILTER_VALIDATION = (context: ContextGoSyntax) => {
  if (
    context?.codeConfigs?.urlFilterSwitch &&
    !context?.codeConfigs?.urlFilterProps.urlFilterText
  ) {
    toast.error(
      'Para usar o filtro de URL, o campo de texto da procura deve ser preenchido'
    );
    return { hasError: true };
  }
  return { hasError: false };
};

const TIMER_VALIDATION = (context: ContextGoSyntax) => {
  if (
    context?.codeConfigs?.timerSwitch &&
    !context?.codeConfigs?.timerProps.timerSeconds
  ) {
    toast.error(
      'Para usar o temporizador, o campo de segundos deve ser preenchido'
    );
    return { hasError: true };
  }
  return { hasError: false };
};

export default [
  NOTHING_SELECTED,
  JS_EVENTS_VALIDATION,
  CUSTOM_MESSAGE_VALIDATION,
  URL_FILTER_VALIDATION,
  TIMER_VALIDATION,
];
