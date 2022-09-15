import { EditorView } from 'codemirror';

import { ContextGoSyntax } from '../../Providers/ContextProvider';

const SCRIPT_TAG = (context: ContextGoSyntax, cmView: EditorView) => ({
  changes: [
    {
      from: 0,
      insert: '<script>',
    },
    {
      from: cmView.state.doc.lines - 1,
      insert: '</script>',
    },
  ],
});

const URL_FILTER_CHECKED = (context: ContextGoSyntax) => {
  if (context.taskConfigs?.enhancedConversions?.ecUrlFilterSwitch) {
    const condition =
      context.taskConfigs?.enhancedConversions?.ecUrlFilterProps
        ?.ecUrlFilterCondition;

    const text =
      context.taskConfigs?.enhancedConversions?.ecUrlFilterProps
        ?.ecUrlFilterText;

    if (condition === 'contains') {
      return {
        changes: [
          {
            from: 1,
            insert: `if (window.location.href.includes('${text}')) {`,
          },
          {
            from: 9,
            insert: `};`,
          },
        ],
      };
    }

    if (condition === 'no-contains') {
      return {
        changes: [
          {
            from: 1,
            insert: `if (!window.location.href.includes('${text}')) {`,
          },
          {
            from: 9,
            insert: `};`,
          },
        ],
      };
    }

    if (condition === 'equals') {
      return {
        changes: [
          {
            from: 1,
            insert: `if (${text} === window.location.href) {`,
          },
          {
            from: 9,
            insert: `};`,
          },
        ],
      };
    }

    if (condition === 'no-equals') {
      return {
        changes: [
          {
            from: 1,
            insert: `if (${text} !== window.location.href) {`,
          },
          {
            from: 9,
            insert: `};`,
          },
        ],
      };
    }

    return { changes: [] };
  }

  return { changes: [] };
};

const TIMER_CHECKED = (context: ContextGoSyntax) => {
  if (context.taskConfigs?.enhancedConversions?.ecTimerSwitch) {
    const condition =
      context.taskConfigs?.enhancedConversions?.ecTimerProps.ecTimerCondition;
    const text =
      context.taskConfigs?.enhancedConversions?.ecTimerProps.ecTimerSeconds;

    if (condition === 'timeout') {
      return {
        changes: [
          {
            from: 3,
            insert: `setTimeout(function() {`,
          },
          {
            from: 9,
            insert: `}, ${text} * 1000)`,
          },
        ],
      };
    }

    if (condition === 'interval') {
      return {
        changes: [
          {
            from: 3,
            insert: `var interval = setInterval(function() {`,
          },
          {
            from: 9,
            insert: `}, ${text} * 1000)`,
          },
        ],
      };
    }

    return { changes: [] };
  }

  return { changes: [] };
};

const ENHANCED_CONVERSIONS = (context: ContextGoSyntax, cmView: EditorView) => {
  const emailCssSelector =
    context.taskConfigs.enhancedConversions?.ecFieldsData.email;

  const phoneCssSelector =
    context.taskConfigs.enhancedConversions?.ecFieldsData.phone?.number;

  const areaCode =
    context.taskConfigs.enhancedConversions?.ecFieldsData.phone?.area_code;

  /* eslint-disable */
  const code = `
  var g_ED = {
    "email" : '${emailCssSelector}',
    ${phoneCssSelector && areaCode ? `"phone_number" : '${phoneCssSelector}'` : ''}
  }


  ${phoneCssSelector && areaCode ? `var g_countrycode = '${areaCode}';` : ''}

  window.enhanced_conversion_data = window.enhanced_conversion_data || {};
  document.addEventListener('input', g_save_toLocalStorage);
  function g_save_toLocalStorage(e) {
    var input = e.target;
    for(i in g_ED) {
      if(input.matches(g_ED[i]) ){
        localStorage['g_'+ i] = input.value;
      }
    }
    g_setup_Enhanced_Conversion_Data();
  }


  function g_setup_Enhanced_Conversion_Data(){
    for(i in g_ED) {
      //Início do Email + Telefone
      if(localStorage['g_' + i]) {
        if(i == 'email' && g_validateEmail(localStorage['g_' + i])) {
          window.enhanced_conversion_data[i] = localStorage['g_' + i];
        }
        if(i == 'phone_number' && window.enhanced_conversion_data['email']) {
          window.enhanced_conversion_data[i] = g_countrycode + localStorage['g_' + i];
          window.enhanced_conversion_data[i] = window.enhanced_conversion_data[i].replace(/\D/g, '');
        }
      }
      //Fim do Email + Telefone
    }
  }

  //Validações (não mexer)
  function g_validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  g_setup_Enhanced_Conversion_Data();
  `;
  /* eslint-enable */

  return {
    changes: [
      {
        from: Math.floor(cmView.state.doc.lines / 2) - 1,
        insert: code,
      },
    ],
  };
};

export default [
  SCRIPT_TAG,
  URL_FILTER_CHECKED,
  ENHANCED_CONVERSIONS,
  TIMER_CHECKED,
];
