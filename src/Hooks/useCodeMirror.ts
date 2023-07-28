import { useCallback, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { html } from '@codemirror/lang-html';

export default function useCodeMirror(...extensions: Extension[]) {
  const [view, setView] = useState<EditorView>();

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const CmView = new EditorView({
        state: EditorState.create({
          extensions: [basicSetup, html(), ...extensions],
          doc: `\n`.repeat(15),
        }),
        parent: node,
      });

      setView(CmView);
    },
    [extensions]
  );

  return { ref, view };
}
