import { Button, CssBaseline, Box, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TabContext, TabList } from '@mui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { HiCode } from 'react-icons/hi';
import { AiOutlineClear } from 'react-icons/ai';
import { basicSetup, EditorView } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { EditorState } from '@codemirror/state';
import beautify from 'js-beautify';

import CodeConfigForm from '../Components/Layout/Home/CodeConfigForm';
import TaskConfigForm from '../Components/Layout/Home/TaskConfigForm';
import { styled } from '../Styles/stitches.config';
import { useContextProvider } from '../Providers/ContextProvider';
import subject from '../Utils/observerFactory';
import codeConfigsObserverFn from '../Modules/codeConfigsObserverFn';
import accConfigsObserverFn from '../Modules/tasks/accConfigsObserverFn';
import codeErrorHandler from '../Modules/errorsHandlers/codeErrorHandler';
import accErrorHandler from '../Modules/errorsHandlers/taskHandlers/accErrorHandler';
import aneErrorHandler from '../Modules/errorsHandlers/taskHandlers/aneErrorHandler';
import aneConfigsObserverFn from '../Modules/tasks/aneConfigsObserverFn';
import dlpErrorHandler from '../Modules/errorsHandlers/taskHandlers/dlpErrorHandler';
import dlpConfigsObserverFn from '../Modules/tasks/dlpConfigsObserverFn';
import ecConfigsObserverFn from '../Modules/tasks/ecConfigsObserverFn';
import ecTriggersObserverFn from '../Modules/tasks/ecTriggersObserverFn';

const Container = styled('div', {
  width: '100%',
  height: '87vh',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  padding: '20px 15px',
});

const ExtensionBox = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const ExtensionTitle = styled('h2', {});

const CodeConfigBox = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
});

const CodeMirrorBox = styled('div', {
  width: '100%',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 3,
  top: 0,
  overflowY: 'auto',
});

const CodeMirrorCodeBox = styled('div', {
  width: '100%',
  maxHeight: '80%',
  overflowY: 'auto',
});

const FormBox = styled('div', {
  height: '100%',
});

const FormConfig = styled('form', {
  height: '100%',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#333333',
    },
  },
  typography: {
    fontSize: 11,
  },
});

const theme = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#262626',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#123',
    },
    '.cm-gutters': {
      backgroundColor: '#252525',
      color: '#3ec0d1',
      border: 'none',
    },
  },
  { dark: true }
);

function Home() {
  const [value, setValue] = useState<string>('1');

  const ref = useRef<HTMLDivElement>(null);

  const [codeMirrorEnable, setCodeMirrorEnable] = useState<boolean>(false);
  const [view, setView] = useState<EditorView | null>(null);
  const { context } = useContextProvider();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const taskErrorHandler = [];

    if (context?.focusedTaskType === 'Ads Conversion Code') {
      taskErrorHandler.push(...accErrorHandler);
    }

    if (context?.focusedTaskType === 'Analytics Event') {
      taskErrorHandler.push(...aneErrorHandler);
    }

    if (context?.focusedTaskType === 'DataLayer Push') {
      taskErrorHandler.push(...dlpErrorHandler);
    }

    const codeErrorSubject = subject();
    codeErrorSubject.subscribeObserver(
      ...codeErrorHandler,
      ...taskErrorHandler
    );
    const errorArray = codeErrorSubject.notifyAll(context);

    if (errorArray.length > 0 && errorArray.some(errObj => errObj.hasError)) {
      return;
    }

    setCodeMirrorEnable(true);
  };

  useEffect(() => {
    if (codeMirrorEnable) {
      if (view) view.destroy();

      const CmView = new EditorView({
        state: EditorState.create({
          extensions: [basicSetup, html(), theme],
          doc: `\n`.repeat(12),
        }),
        parent: ref.current as HTMLDivElement,
      });

      const codeObserverSubject = subject();
      codeObserverSubject.subscribeObserver(...codeConfigsObserverFn);
      const codeMethodsResult = codeObserverSubject.notifyAll(context, CmView);

      if (context?.focusedTaskType === 'Ads Conversion Code') {
        const accObserverSubject = subject();
        accObserverSubject.subscribeObserver(...accConfigsObserverFn);
        const accMethodsResult = accObserverSubject.notifyAll(context, CmView);

        CmView.dispatch(...codeMethodsResult, ...accMethodsResult);

        CmView.dispatch({
          changes: [
            {
              from: 0,
              to: CmView.state.doc.length,
              insert: beautify.html(CmView.state.doc.toString(), {
                indent_with_tabs: true,
                indent_size: 4,
                preserve_newlines: true,
                max_preserve_newlines: 1,
              }),
            },
          ],
        });
      }

      if (context?.focusedTaskType === 'Analytics Event') {
        const aneObserverSubject = subject();
        aneObserverSubject.subscribeObserver(...aneConfigsObserverFn);
        const aneMethodsResult = aneObserverSubject.notifyAll(context, CmView);

        CmView.dispatch(...codeMethodsResult, ...aneMethodsResult);

        CmView.dispatch({
          changes: [
            {
              from: 0,
              to: CmView.state.doc.length,
              insert: beautify.html(CmView.state.doc.toString(), {
                indent_with_tabs: true,
                indent_size: 4,
                preserve_newlines: true,
                max_preserve_newlines: 1,
              }),
            },
          ],
        });
      }

      if (context?.focusedTaskType === 'DataLayer Push') {
        const dlpObserverSubject = subject();
        dlpObserverSubject.subscribeObserver(...dlpConfigsObserverFn);
        const dlpMethodsResult = dlpObserverSubject.notifyAll(context, CmView);

        CmView.dispatch(...codeMethodsResult, ...dlpMethodsResult);

        CmView.dispatch({
          changes: [
            {
              from: 0,
              to: CmView.state.doc.length,
              insert: beautify.html(CmView.state.doc.toString(), {
                indent_with_tabs: true,
                indent_size: 4,
                preserve_newlines: true,
                max_preserve_newlines: 1,
              }),
            },
          ],
        });
      }

      if (context?.focusedTaskType === 'Enhanced Conversions') {
        const CmView2 = new EditorView({
          state: EditorState.create({
            extensions: [basicSetup, html()],
            doc: `\n`.repeat(10),
          }),
        });

        const ecConfigObserverSubject = subject();
        ecConfigObserverSubject.subscribeObserver(...ecConfigsObserverFn);
        const ecConfigMethodsResult = ecConfigObserverSubject.notifyAll(
          context,
          CmView2
        );

        CmView2.dispatch(...ecConfigMethodsResult);

        const ecTriggerObserverSubject = subject();
        ecTriggerObserverSubject.subscribeObserver(...ecTriggersObserverFn);
        const ecTriggerMethodsResult = ecTriggerObserverSubject.notifyAll(
          context,
          CmView
        );

        CmView.dispatch(...codeMethodsResult, ...ecTriggerMethodsResult);

        CmView.dispatch({
          changes: [
            {
              from: 0,
              to: CmView.state.doc.length,
              insert: beautify.html(
                `${CmView2.state.doc.toString()}\n\n${CmView.state.doc.toString()}`,
                {
                  indent_with_tabs: true,
                  indent_size: 4,
                  preserve_newlines: true,
                  max_preserve_newlines: 1,
                }
              ),
            },
          ],
        });
      }

      setCodeMirrorEnable(false);
      setView(CmView);
    }
  }, [codeMirrorEnable, context, view]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container>
        <ExtensionBox>
          <ExtensionTitle>GoSyntax</ExtensionTitle>

          <Box
            sx={{
              width: '100%',
              height: '100%',
              typography: 'body1',
            }}
          >
            <TabContext value={value}>
              <Box sx={{ height: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                  >
                    <Tab label="Ads Conversion Code (gtag)" value="1" />
                    <Tab label="Analytics Event (gtag)" value="2" />
                    <Tab label="DataLayer Push Code" value="3" />
                    <Tab label="Enhanced Conversions (GTM)" value="4" />
                  </TabList>
                </Box>

                <FormBox>
                  <FormConfig onSubmit={handleSubmit}>
                    <CodeConfigBox>
                      <CodeConfigForm />
                      <TaskConfigForm />
                    </CodeConfigBox>

                    <Button
                      sx={{ width: '100%', mb: 2 }}
                      variant="contained"
                      endIcon={<HiCode />}
                      type="submit"
                    >
                      Gerar Código
                    </Button>

                    <Button
                      sx={{ width: '100%', mb: 2 }}
                      onClick={() => window.location.reload()}
                      variant="contained"
                      endIcon={<AiOutlineClear />}
                      type="button"
                      color="warning"
                    >
                      Limpar Campos
                    </Button>

                    <CodeMirrorBox>
                      <CodeMirrorCodeBox ref={ref} />
                    </CodeMirrorBox>
                  </FormConfig>
                </FormBox>
              </Box>
            </TabContext>
          </Box>
        </ExtensionBox>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
