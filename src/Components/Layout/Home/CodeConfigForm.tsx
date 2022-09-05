import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  CustomMessageCondition,
  JSEventType,
  TriggerType,
  URLFilterConditions,
  useContextProvider,
} from '../../../Providers/ContextProvider';
import { styled } from '../../../Styles/stitches.config';

const Form = styled('div', {
  width: '100%',
  height: '100%',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  padding: '14px',
});

const FormDiv = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const DivFilterLayout = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',

  '& span': {
    fontSize: '12px',
  },
});

function CodeConfigForm() {
  // TriggersState
  const [triggerTypeValue, setTriggerTypeValue] =
    useState<TriggerType>('no-event');
  const [jsEventTypeValue, setJsEventTypeValue] =
    useState<JSEventType>('click');
  const [jsEventCssTargetValue, setJsEventCssTargetValue] =
    useState<string>('');
  const [customMessageConditionValue, setCustomMessageConditionValue] =
    useState<CustomMessageCondition>('equals');
  const [customMessageTextValue, setCustomMessageTextValue] =
    useState<string>('');

  // CodeConfigState
  const [domReadySwitch, setDomReadySwitch] = useState<boolean>(false);
  const [urlFilterSwitch, setUrlFilterSwitch] = useState<boolean>(false);
  const [urlFilterConditionValue, setUrlFilterConditionValue] =
    useState<URLFilterConditions>('contains');
  const [urlFilterTextValue, setUrlFilterTextValue] = useState<string>('');

  const { setContext } = useContextProvider();

  useEffect(() => {
    const updateContextState = () => {
      setContext(prevValue => ({
        ...prevValue,
        codeConfigs: {
          domReadySwitch,
          urlFilterSwitch,
          urlFilterProps: {
            urlFilterCondition: urlFilterConditionValue,
            urlFilterText: urlFilterTextValue,
          },
          triggerProps: {
            triggerType: triggerTypeValue,
            jsEventType: jsEventTypeValue,
            jsEventCSSTarget: jsEventCssTargetValue,
            customMessageProps: {
              customMessageCondition: customMessageConditionValue,
              customMessageText: customMessageTextValue,
            },
          },
        },
      }));
    };

    updateContextState();
  }, [
    domReadySwitch,
    urlFilterSwitch,
    triggerTypeValue,
    jsEventTypeValue,
    jsEventCssTargetValue,
    customMessageConditionValue,
    customMessageTextValue,
    urlFilterConditionValue,
    urlFilterTextValue,
    setContext,
  ]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <FormDiv>
        <Form>
          <List
            sx={{
              width: '100%',
              bgcolor: '#292929',
              padding: '12px',
              borderBottom: 1,
              borderColor: 'divider',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              height: '100%',
            }}
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: '#292929',
                  lineHeight: '3.5em',
                }}
              >
                Configurações de Disparo
              </ListSubheader>
            }
          >
            <ListItem>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="trigger-type-label">
                  Selecione qual será o tipo do disparo (acionador)
                </InputLabel>
                <Select
                  labelId="trigger-type-label"
                  id="trigger-type"
                  value={triggerTypeValue}
                  onChange={e => {
                    setTriggerTypeValue(e.target.value as TriggerType);
                  }}
                  size="small"
                  label="Selecione qual será o tipo do disparo (acionador)"
                >
                  <MenuItem value="no-event">
                    Nenhum disparo específico
                  </MenuItem>
                  <MenuItem value="one-js-event">
                    Evento JavaScript (elemento único)
                  </MenuItem>
                  <MenuItem value="array-js-event">
                    Evento JavaScript (vários elementos)
                  </MenuItem>
                  <MenuItem value="custom-message">
                    Mensagem Personalizada na Página
                  </MenuItem>
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Insira o tipo de evento JavaScript</InputLabel>
                <Select
                  labelId="js-event-type-label"
                  id="js-event-type"
                  disabled={
                    triggerTypeValue === 'no-event' ||
                    triggerTypeValue === 'custom-message'
                  }
                  value={jsEventTypeValue}
                  onChange={e => {
                    setJsEventTypeValue(e.target.value as JSEventType);
                  }}
                  size="small"
                  label="Insira o tipo de evento JavaScript"
                >
                  <MenuItem value="click" selected>
                    Click
                  </MenuItem>
                  <MenuItem value="submit">Submit</MenuItem>
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth variant="outlined">
                <TextField
                  disabled={
                    triggerTypeValue === 'no-event' ||
                    triggerTypeValue === 'custom-message'
                  }
                  id="js-event-css-target"
                  variant="outlined"
                  value={jsEventCssTargetValue}
                  onChange={e => {
                    setJsEventCssTargetValue(e.target.value);
                  }}
                  label="Insira o seletor CSS do alvo do Evento JavaScript"
                  size="small"
                />
              </FormControl>
            </ListItem>

            <ListItem>
              <DivFilterLayout>
                <span>Mensagem Personalizada</span>

                <FormControl sx={{ width: '25%' }} variant="outlined">
                  <Select
                    labelId="custom-msg-condition-label"
                    id="custom-msg-condition"
                    value={customMessageConditionValue}
                    disabled={triggerTypeValue !== 'custom-message'}
                    onChange={e => {
                      setCustomMessageConditionValue(
                        e.target.value as CustomMessageCondition
                      );
                    }}
                    size="small"
                  >
                    <MenuItem value="equals">Igual a</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: '25%' }} variant="outlined">
                  <TextField
                    disabled={triggerTypeValue !== 'custom-message'}
                    id="custom-msg-text"
                    variant="outlined"
                    value={customMessageTextValue}
                    onChange={e => {
                      setCustomMessageTextValue(e.target.value);
                    }}
                    size="small"
                  />
                </FormControl>
              </DivFilterLayout>
            </ListItem>
          </List>

          <List
            sx={{
              width: '100%',
              bgcolor: '#292929',
              padding: '12px',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              height: '100%',
            }}
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: '#292929',
                  lineHeight: '3.5em',
                }}
              >
                Configurações Gerais do Código
              </ListSubheader>
            }
          >
            <ListItem>
              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  label="Aguardar DOM carregar (DOM Ready)"
                  id="dom-ready-switch"
                  checked={domReadySwitch}
                  onChange={() => {
                    setDomReadySwitch(prevValue => !prevValue);
                  }}
                />

                <FormControlLabel
                  control={<Switch />}
                  label="Habilitar filtro de URL"
                  id="url-filter-switch"
                  checked={urlFilterSwitch}
                  onChange={() => {
                    setUrlFilterSwitch(prevValue => !prevValue);
                  }}
                />
              </FormGroup>
            </ListItem>

            <ListItem>
              <DivFilterLayout>
                <span>URL</span>

                <FormControl sx={{ width: '25%' }} variant="outlined">
                  <Select
                    labelId="url-filter-condition-label"
                    id="url-filter-condition"
                    value={urlFilterConditionValue}
                    onChange={e => {
                      setUrlFilterConditionValue(
                        e.target.value as URLFilterConditions
                      );
                    }}
                    disabled={!urlFilterSwitch}
                    size="small"
                  >
                    <MenuItem value="contains">Contém</MenuItem>
                    <MenuItem value="no-contains">Não Contém</MenuItem>
                    <MenuItem value="equals">Igual a</MenuItem>
                    <MenuItem value="no-equals">Não é igual a</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: '25%' }} variant="outlined">
                  <TextField
                    disabled={!urlFilterSwitch}
                    id="url-filter-text"
                    variant="outlined"
                    value={urlFilterTextValue}
                    onChange={e => {
                      setUrlFilterTextValue(e.target.value);
                    }}
                    size="small"
                  />
                </FormControl>
              </DivFilterLayout>
            </ListItem>
          </List>
        </Form>
      </FormDiv>
    </Box>
  );
}

export default CodeConfigForm;
