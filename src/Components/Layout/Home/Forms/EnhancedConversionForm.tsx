import {
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
  EnhancedConversionCurrencyType,
  EnhancedConversionType,
  TimerConditions,
  URLFilterConditions,
  useContextProvider,
} from '../../../../Providers/ContextProvider';
import { styled } from '../../../../Styles/stitches.config';

const Form = styled('div', {
  width: '100%',
  height: '100%',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const DivFormContainer = styled('div', {
  width: '100%',
  height: '100%',
});

const DivFilterLayout = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',

  '& span': {
    fontSize: '12px',
  },
});

function EnhancedConversionForm() {
  const [enhancedConversionType, setEnhancedConversionType] =
    useState<EnhancedConversionType>('no-value');

  const [ecUrlFilterSwitch, setEcUrlFilterSwitch] = useState<boolean>(false);
  const [ecUrlFilterConditionValue, setEcUrlFilterConditionValue] =
    useState<URLFilterConditions>('contains');
  const [ecUrlFilterTextValue, setEcUrlFilterTextValue] = useState<string>('');

  const [ecTimerSwitch, setEcTimerSwitch] = useState<boolean>(false);
  const [ecTimerConditionValue, setEcTimerConditionValue] =
    useState<TimerConditions>('timeout');
  const [ecTimerSecondsValue, setEcTimerSecondsValue] = useState<string>('');

  const [enhancedConversionValue, setEnhancedConversionValue] =
    useState<string>('');
  const [enhancedConversionTransactionId, setEnhancedConversionTransactionId] =
    useState<string>('');
  const [enhancedConversionCurrency, setEnhancedConversionCurrency] =
    useState<EnhancedConversionCurrencyType>('BRL');

  const [enhancedConversionEmail, setEnhancedConversionEmail] =
    useState<string>('');
  const [enhancedConversionPhoneNumber, setEnhancedConversionPhoneNumber] =
    useState<string>('');
  const [enhancedConversionAreaCode, setEnhancedConversionAreaCode] =
    useState<string>('');

  const { setContext } = useContextProvider();

  useEffect(() => {
    const updateContextState = () => {
      setContext(prevValue => ({
        ...prevValue,
        focusedTaskType: 'Enhanced Conversions',
        taskConfigs: {
          enhancedConversions: {
            enhancedConversionType,
            ecUrlFilterSwitch,
            ecTimerSwitch,
            ecUrlFilterProps: {
              ecUrlFilterCondition: ecUrlFilterConditionValue,
              ecUrlFilterText: ecUrlFilterTextValue,
            },
            ecTimerProps: {
              ecTimerCondition: ecTimerConditionValue,
              ecTimerSeconds: ecTimerSecondsValue,
            },
            ecPurchaseData: {
              enhancedConversionValue,
              enhancedConversionTransactionId,
              enhancedConversionCurrency,
            },
            ecFieldsData: {
              email: enhancedConversionEmail,
              phone: {
                number: enhancedConversionPhoneNumber,
                area_code: enhancedConversionAreaCode,
              },
            },
          },
        },
      }));
    };

    updateContextState();
  }, [
    enhancedConversionType,
    ecUrlFilterSwitch,
    ecUrlFilterConditionValue,
    ecUrlFilterTextValue,
    ecTimerSwitch,
    ecTimerConditionValue,
    ecTimerSecondsValue,
    enhancedConversionValue,
    enhancedConversionTransactionId,
    enhancedConversionCurrency,
    enhancedConversionEmail,
    enhancedConversionPhoneNumber,
    enhancedConversionAreaCode,
    setContext,
  ]);

  return (
    <DivFormContainer>
      <Form>
        <List
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#292929',
            padding: '8px 12px',
            borderBottom: 1,
            borderColor: 'divider',
          }}
          subheader={
            <ListSubheader
              sx={{
                bgcolor: '#292929',
                lineHeight: '3.5em',
              }}
            >
              Configurações de Tag
            </ListSubheader>
          }
        >
          <ListItem>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Qual o tipo de conversão?</InputLabel>
              <Select
                labelId="enhanced-conversion-type-label"
                id="enhanced-conversion-type"
                value={enhancedConversionType}
                onChange={e =>
                  setEnhancedConversionType(
                    e.target.value as EnhancedConversionType
                  )
                }
                size="small"
                label="Qual o tipo de conversão?"
              >
                <MenuItem value="no-value" selected>
                  Conversão sem valor definido (apenas formulário)
                </MenuItem>
                <MenuItem value="with-value">
                  Conversão com valor (formulário + página final)
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel
                control={<Switch />}
                label="Habilitar filtro de URL"
                id="url-filter-switch"
                checked={ecUrlFilterSwitch}
                onChange={() => setEcUrlFilterSwitch(prevValue => !prevValue)}
              />

              <FormControlLabel
                control={<Switch />}
                label="Habilitar temporizador"
                id="ec-timer-switch"
                checked={ecTimerSwitch}
                onChange={() => {
                  setEcTimerSwitch(prevValue => !prevValue);
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
                  disabled={!ecUrlFilterSwitch}
                  size="small"
                  value={ecUrlFilterConditionValue}
                  onChange={e =>
                    setEcUrlFilterConditionValue(
                      e.target.value as URLFilterConditions
                    )
                  }
                >
                  <MenuItem value="contains">Contém</MenuItem>
                  <MenuItem value="no-contains">Não Contém</MenuItem>
                  <MenuItem value="equals">Igual a</MenuItem>
                  <MenuItem value="no-equals">Não é igual a</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: '25%' }} variant="outlined">
                <TextField
                  disabled={!ecUrlFilterSwitch}
                  id="url-filter-text"
                  variant="outlined"
                  size="small"
                  value={ecUrlFilterTextValue}
                  onChange={e => setEcUrlFilterTextValue(e.target.value)}
                />
              </FormControl>
            </DivFilterLayout>
          </ListItem>

          <ListItem>
            <DivFilterLayout>
              <span>Temporizador</span>

              <FormControl sx={{ width: '25%' }} variant="outlined">
                <Select
                  labelId="ec-timer-condition-label"
                  id="ec-timer-condition"
                  value={ecTimerConditionValue}
                  onChange={e => {
                    setEcTimerConditionValue(e.target.value as TimerConditions);
                  }}
                  disabled={!ecTimerSwitch}
                  size="small"
                >
                  <MenuItem value="timeout">Tempo Limite</MenuItem>
                  <MenuItem value="interval">Intervalo</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: '25%' }} variant="outlined">
                <TextField
                  disabled={!ecTimerSwitch}
                  id="ec-timer-seconds"
                  variant="outlined"
                  value={ecTimerSecondsValue}
                  onChange={e => {
                    setEcTimerSecondsValue(e.target.value);
                  }}
                  size="small"
                  label="Tempo em segundos"
                />
              </FormControl>
            </DivFilterLayout>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                disabled={enhancedConversionType === 'no-value'}
                id="enhanced-conversion-value-css-selector"
                variant="outlined"
                label="Insira o seletor CSS do valor"
                onChange={e => setEnhancedConversionValue(e.target.value)}
                value={enhancedConversionValue}
                size="small"
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                disabled={enhancedConversionType === 'no-value'}
                id="enahnced-conversion-css-target"
                variant="outlined"
                label="Insira o seletor CSS do ID da Transação"
                onChange={e =>
                  setEnhancedConversionTransactionId(e.target.value)
                }
                value={enhancedConversionTransactionId}
                size="small"
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="enhanced-conversion-currency-label">
                Insira o tipo da moeda
              </InputLabel>
              <Select
                labelId="enhanced-conversion-currency-label"
                id="enhanced-conversion-currency"
                disabled={enhancedConversionType === 'no-value'}
                onChange={e =>
                  setEnhancedConversionCurrency(
                    e.target.value as EnhancedConversionCurrencyType
                  )
                }
                value={enhancedConversionCurrency}
                size="small"
                label="Insira o tipo da moeda"
              >
                <MenuItem value="BRL" selected>
                  Real (BRL)
                </MenuItem>
                <MenuItem value="USD">Dólar (USD)</MenuItem>
                <MenuItem value="EUR">Euro (EUR)</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>

        <List
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#292929',
            padding: '8px 12px',
          }}
          subheader={
            <ListSubheader
              sx={{
                bgcolor: '#292929',
                lineHeight: '2em',
              }}
            >
              Configurações de Enhanced Conversion
            </ListSubheader>
          }
        >
          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="enhanced-conversion-email"
                label="Seletor CSS do campo E-mail"
                variant="outlined"
                onChange={e => setEnhancedConversionEmail(e.target.value)}
                value={enhancedConversionEmail}
                size="small"
                type="text"
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <DivFilterLayout>
                <TextField
                  id="enhanced-conversion-phone"
                  label="Seletor CSS do campo Telefone"
                  variant="outlined"
                  onChange={e =>
                    setEnhancedConversionPhoneNumber(e.target.value)
                  }
                  value={enhancedConversionPhoneNumber}
                  fullWidth
                  sx={{ mr: 1 }}
                  size="small"
                  type="text"
                />

                <TextField
                  id="enhanced-conversion-area-code"
                  label="Código de área do Telefone"
                  variant="outlined"
                  onChange={e => setEnhancedConversionAreaCode(e.target.value)}
                  value={enhancedConversionAreaCode}
                  fullWidth
                  sx={{ ml: 1 }}
                  size="small"
                  type="text"
                />
              </DivFilterLayout>
            </FormControl>
          </ListItem>
        </List>
      </Form>
    </DivFormContainer>
  );
}

export default EnhancedConversionForm;
