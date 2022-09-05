import { EditorView } from 'codemirror';

import { ContextGoSyntax } from '../../Providers/ContextProvider';

const ANALYTICS_EVENT = (context: ContextGoSyntax, cmView: EditorView) => {
  const aneParameters = context.taskConfigs.analyticsEvent?.aneParameters;
  const aneEventName = context.taskConfigs.analyticsEvent?.aneEventName;

  if (aneParameters && aneParameters.length > 0) {
    const stringParams = aneParameters.map(
      param => `'${param.key}': ${param.value}`
    );

    const code = `gtag('event', '${aneEventName}', { ${stringParams.toString()} });`;

    return {
      changes: [
        {
          from: Math.floor(cmView.state.doc.lines / 2) - 1,
          insert: code,
        },
      ],
    };
  }

  if (!aneParameters || aneParameters.length <= 0) {
    const code = `gtag('event', '${aneEventName}', {});`;

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

export default [ANALYTICS_EVENT];
