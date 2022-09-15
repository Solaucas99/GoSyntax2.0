import {
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  ListSubheader,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DlpKeyValueType,
  useContextProvider,
} from '../../../../Providers/ContextProvider';
import { styled } from '../../../../Styles/stitches.config';

const Form = styled('div', {
  width: '100%',
  height: '100%',
  fontSize: '14px',
});

const DivFormContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

function DataLayerPushForm() {
  const [paramsArrKeyValues, setParamsArrKeyValues] = useState<
    DlpKeyValueType[]
  >([]);

  const { setContext } = useContextProvider();

  const handleParameterAdd = () => {
    const id = Math.floor(Math.random() * 10000000);

    setParamsArrKeyValues(prevValue => [
      ...prevValue,
      { id, key: '', value: '' },
    ]);
  };

  useEffect(() => {
    const updateContextState = () => {
      setContext(prevValue => ({
        ...prevValue,
        focusedTaskType: 'DataLayer Push',
        taskConfigs: {
          dataLayerPush: {
            dlpParameters: paramsArrKeyValues,
          },
        },
      }));
    };

    updateContextState();
  }, [setContext, paramsArrKeyValues]);

  return (
    <DivFormContainer>
      <Form>
        <List
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#292929',
            padding: '12px',
          }}
          subheader={
            <ListSubheader
              sx={{
                bgcolor: '#292929',
                lineHeight: '2em',
              }}
            >
              Configurações de Tag
            </ListSubheader>
          }
        >
          <ListItem>
            <FormControl fullWidth>
              <Button
                onClick={handleParameterAdd}
                variant="contained"
                type="button"
              >
                Adicionar parâmetro
              </Button>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth>
              <Box
                sx={{
                  width: '100%',
                  typography: 'body1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '20em',
                  overflowY: 'auto',
                  border: '1px solid grey',
                }}
              >
                {paramsArrKeyValues.length > 0 &&
                  paramsArrKeyValues.map((element, index) => (
                    <Box
                      sx={{
                        width: '100%',
                        typography: 'body1',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '10px 5px',
                      }}
                      key={element.id}
                    >
                      <FormControl variant="outlined">
                        <TextField
                          id="dlp-key"
                          label="Chave *"
                          variant="outlined"
                          onChange={e =>
                            setParamsArrKeyValues(prevValue =>
                              prevValue.map(value =>
                                value.id === element.id
                                  ? { ...value, key: e.target.value }
                                  : value
                              )
                            )
                          }
                          value={
                            paramsArrKeyValues.filter(
                              value => value.id === element.id
                            )[0].key
                          }
                        />
                      </FormControl>

                      <FormControl variant="outlined">
                        <TextField
                          id="dlp-value"
                          label="Valor *"
                          variant="outlined"
                          onChange={e =>
                            setParamsArrKeyValues(prevValue =>
                              prevValue.map(value =>
                                value.id === element.id
                                  ? { ...value, value: e.target.value }
                                  : value
                              )
                            )
                          }
                          value={
                            paramsArrKeyValues.filter(
                              value => value.id === element.id
                            )[0].value
                          }
                        />
                      </FormControl>

                      <FormControl variant="outlined">
                        <Button
                          onClick={() => {
                            setParamsArrKeyValues(prevValue =>
                              prevValue.filter(
                                (value, indexComp) => index !== indexComp
                              )
                            );
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Remover
                        </Button>
                      </FormControl>
                    </Box>
                  ))}
              </Box>
            </FormControl>
          </ListItem>
        </List>
      </Form>
    </DivFormContainer>
  );
}

export default DataLayerPushForm;
