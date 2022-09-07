import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  AccConversionCurrencyType,
  AccConversionType,
  useContextProvider,
} from '../../../../Providers/ContextProvider';
import { styled } from '../../../../Styles/stitches.config';

const Form = styled('div', {
  width: '100%',
  height: '100%',
  fontSize: '14px',
});

const DivFormContainer = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

function AdsConversionCodeForm() {
  const [accConversionType, setAccConversionType] =
    useState<AccConversionType>('no-value');
  const [accConversionId, setAccConversionId] = useState<string>('');
  const [accConversionLabel, setAccConversionLabel] = useState<string>('');
  const [accConversionValue, setAccConversionValue] = useState<string>('');
  const [accConversionTransactionId, setAccConversionTransactionId] =
    useState<string>('');
  const [accConversionCurrency, setAccConversionCurrency] =
    useState<AccConversionCurrencyType>('BRL');

  const { setContext } = useContextProvider();

  useEffect(() => {
    const updateContextState = () => {
      setContext(prevValue => ({
        ...prevValue,
        focusedTaskType: 'Ads Conversion Code',
        taskConfigs: {
          adsConversionCode: {
            accConversionType,
            accConversionId,
            accConversionLabel,
            accConversionValue,
            accConversionTransactionId,
            accConversionCurrency,
          },
        },
      }));
    };

    updateContextState();
  }, [
    accConversionType,
    accConversionId,
    accConversionLabel,
    accConversionValue,
    accConversionTransactionId,
    accConversionCurrency,
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
            padding: '12px',
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
                labelId="acc-conversion-type-label"
                id="acc-conversion-type"
                value={accConversionType}
                onChange={e =>
                  setAccConversionType(e.target.value as AccConversionType)
                }
                label="Qual o tipo de conversão?"
              >
                <MenuItem value="no-value" selected>
                  Conversão sem valor definido
                </MenuItem>
                <MenuItem value="with-value">Conversão com valor</MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="acc-conversion-id"
                label="Insira o ID da conversão"
                variant="outlined"
                onChange={e => setAccConversionId(e.target.value)}
                value={accConversionId}
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="acc-conversion-label"
                label="Insira o rótulo da conversão"
                variant="outlined"
                onChange={e => setAccConversionLabel(e.target.value)}
                value={accConversionLabel}
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                disabled={accConversionType === 'no-value'}
                id="acc-value-css-selector"
                variant="outlined"
                label="Insira o seletor CSS do valor"
                onChange={e => setAccConversionValue(e.target.value)}
                value={accConversionValue}
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <TextField
                disabled={accConversionType === 'no-value'}
                id="js-event-css-target"
                variant="outlined"
                label="Insira o seletor CSS do ID da Transação"
                onChange={e => setAccConversionTransactionId(e.target.value)}
                value={accConversionTransactionId}
              />
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="acc-conversion-currency-label">
                Insira o tipo da moeda
              </InputLabel>
              <Select
                labelId="acc-conversion-currency-label"
                id="acc-conversion-currency"
                value={accConversionCurrency}
                disabled={accConversionType === 'no-value'}
                onChange={e =>
                  setAccConversionCurrency(
                    e.target.value as AccConversionCurrencyType
                  )
                }
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
      </Form>
    </DivFormContainer>
  );
}

export default AdsConversionCodeForm;
