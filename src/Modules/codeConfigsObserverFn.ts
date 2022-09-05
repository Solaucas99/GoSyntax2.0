import { EditorView } from 'codemirror';
import { ContextGoSyntax } from '../Providers/ContextProvider';

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
  if (context.codeConfigs?.urlFilterSwitch) {
    const condition = context.codeConfigs?.urlFilterProps.urlFilterCondition;
    const text = context.codeConfigs?.urlFilterProps.urlFilterText;

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

const DOM_READY_CHECKED = (context: ContextGoSyntax) => {
  if (context.codeConfigs?.domReadySwitch) {
    return {
      changes: [
        {
          from: 2,
          insert: `document.addEventListener('DOMContentLoaded', function() {`,
        },
        {
          from: 8,
          insert: `});`,
        },
      ],
    };
  }

  return { changes: [] };
};

const TRIGGER_TYPE = (context: ContextGoSyntax) => {
  if (context.codeConfigs?.triggerProps.triggerType === 'no-event') {
    return {
      changes: [],
    };
  }

  if (context.codeConfigs?.triggerProps.triggerType === 'one-js-event') {
    return {
      changes: [
        {
          from: 3,
          insert: `document.querySelector('${context.codeConfigs?.triggerProps.jsEventCSSTarget}').addEventListener('${context.codeConfigs?.triggerProps.jsEventType}', function() {`,
        },
        {
          from: 6,
          insert: '});',
        },
      ],
    };
  }

  if (context.codeConfigs?.triggerProps.triggerType === 'array-js-event') {
    return {
      changes: [
        {
          from: 3,
          insert: `document.querySelectorAll('${context.codeConfigs?.triggerProps.jsEventCSSTarget}').forEach(function (element) {   element.addEventListener('${context.codeConfigs?.triggerProps.jsEventType}', function() {`,
        },
        {
          from: 6,
          insert: '  });  });',
        },
      ],
    };
  }

  if (context.codeConfigs?.triggerProps.triggerType === 'custom-message') {
    if (
      context.codeConfigs?.triggerProps.customMessageProps
        .customMessageCondition === 'equals'
    ) {
      return {
        changes: [
          {
            from: 3,
            insert: `var googleForm = '${context.codeConfigs?.triggerProps.customMessageProps.customMessageText}'; (function googleFormValidation() {  if (document.body && document.body.innerText.includes(googleForm)) {  `,
          },
          {
            from: 6,
            insert:
              '  } else {  setTimeout(googleFormValidation, 500);  }  })();',
          },
        ],
      };
    }

    return { changes: [] };
  }

  return { changes: [] };
};

export default [
  URL_FILTER_CHECKED,
  SCRIPT_TAG,
  DOM_READY_CHECKED,
  TRIGGER_TYPE,
];
