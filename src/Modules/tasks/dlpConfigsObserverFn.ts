import { EditorView } from 'codemirror';

import { ContextGoSyntax } from '../../Providers/ContextProvider';

const DATALAYER_PUSH = (context: ContextGoSyntax, cmView: EditorView) => {
  const dlpParameters = context.taskConfigs.dataLayerPush?.dlpParameters;

  if (dlpParameters && dlpParameters.length > 0) {
    const stringParams = dlpParameters.map(
      param => `'${param.key}': ${param.value}`
    );

    const code = `dataLayer.push({ ${stringParams.toString()} });`;

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

export default [DATALAYER_PUSH];
