import React, { useState, createContext, useMemo, useContext } from 'react';

export type TaskTypes =
  | 'Ads Conversion Code'
  | 'Analytics Event'
  | 'DataLayer Push'
  | 'Enhanced Conversions';

export type TriggerType =
  | 'no-event'
  | 'one-js-event'
  | 'array-js-event'
  | 'custom-message';

export type JSEventType = 'click' | 'submit';

export type CustomMessageCondition = 'equals';

export type URLFilterConditions =
  | 'contains'
  | 'no-contains'
  | 'equals'
  | 'no-equals';

export type TimerConditions = 'timeout' | 'interval';

// Task - Ads Conversion Code
export type AccConversionType = 'no-value' | 'with-value';
export type AccConversionCurrencyType = 'BRL' | 'USD' | 'EUR';

// Task - AnalyticsEvent
export type AneKeyValueType = { id: number; key: string; value: string };

// Task - DataLayerPush
export type DlpKeyValueType = { id: number; key: string; value: string };

// Task - Enhanced Conversion Code
export type EnhancedConversionType = 'no-value' | 'with-value';
export type EnhancedConversionCurrencyType = 'BRL' | 'USD' | 'EUR';

export type ContextGoSyntax = {
  focusedTaskType?: TaskTypes;
  codeConfigs?: {
    triggerProps: {
      triggerType: TriggerType;
      jsEventType: JSEventType;
      jsEventCSSTarget: string;
      customMessageProps: {
        customMessageCondition: CustomMessageCondition;
        customMessageText: string;
      };
    };
    domReadySwitch: boolean;
    urlFilterSwitch: boolean;
    timerSwitch: boolean;
    urlFilterProps?: {
      urlFilterCondition: URLFilterConditions;
      urlFilterText: string;
    };
    timerProps?: {
      timerCondition: TimerConditions;
      timerSeconds: string;
    };
  };
  taskConfigs: {
    adsConversionCode?: {
      accConversionType: AccConversionType;
      accConversionId: string;
      accConversionLabel: string;
      accConversionValue: string;
      accConversionTransactionId: string;
      accConversionCurrency: AccConversionCurrencyType;
    };
    analyticsEvent?: {
      aneEventName: string;
      aneParameters: AneKeyValueType[];
    };
    dataLayerPush?: {
      dlpParameters: DlpKeyValueType[];
    };
    enhancedConversions?: {
      enhancedConversionType: EnhancedConversionType;
      ecUrlFilterSwitch: boolean;
      ecTimerSwitch: boolean;
      ecUrlFilterProps?: {
        ecUrlFilterCondition: URLFilterConditions;
        ecUrlFilterText: string;
      };
      ecTimerProps?: {
        ecTimerCondition: TimerConditions;
        ecTimerSeconds: string;
      };
      ecPurchaseData?: {
        enhancedConversionValue: string;
        enhancedConversionTransactionId: string;
        enhancedConversionCurrency: EnhancedConversionCurrencyType;
      };
      ecFieldsData: {
        email: string;
        phone?: {
          number: string;
          area_code: string;
        };
      };
    };
  };
};

type ContextType = {
  context: ContextGoSyntax;
  setContext: React.Dispatch<React.SetStateAction<ContextGoSyntax>>;
};

const contextInitialValue: ContextGoSyntax = {
  focusedTaskType: 'Ads Conversion Code',
  codeConfigs: {
    domReadySwitch: false,
    urlFilterSwitch: false,
    timerSwitch: false,
    urlFilterProps: {
      urlFilterCondition: 'contains',
      urlFilterText: '',
    },
    timerProps: {
      timerCondition: 'timeout',
      timerSeconds: '',
    },
    triggerProps: {
      triggerType: 'no-event',
      jsEventType: 'click',
      jsEventCSSTarget: '',
      customMessageProps: {
        customMessageCondition: 'equals',
        customMessageText: '',
      },
    },
  },
  taskConfigs: {
    adsConversionCode: {
      accConversionType: 'no-value',
      accConversionCurrency: 'BRL',
      accConversionId: '',
      accConversionLabel: '',
      accConversionValue: '',
      accConversionTransactionId: '',
    },
    analyticsEvent: {
      aneEventName: '',
      aneParameters: [],
    },
    dataLayerPush: {
      dlpParameters: [],
    },
    enhancedConversions: {
      enhancedConversionType: 'no-value',
      ecFieldsData: {
        email: '',
        phone: {
          number: '',
          area_code: '',
        },
      },
      ecPurchaseData: {
        enhancedConversionValue: '',
        enhancedConversionTransactionId: '',
        enhancedConversionCurrency: 'BRL',
      },
      ecTimerSwitch: false,
      ecUrlFilterSwitch: false,
      ecUrlFilterProps: {
        ecUrlFilterCondition: 'contains',
        ecUrlFilterText: '',
      },
      ecTimerProps: {
        ecTimerCondition: 'timeout',
        ecTimerSeconds: '',
      },
    },
  },
};

const Context = createContext<ContextType | null>(null);

export function useContextProvider() {
  return useContext(Context) as ContextType;
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<ContextGoSyntax>(contextInitialValue);

  const obj = useMemo(
    () => ({
      context,
      setContext,
    }),
    [context, setContext]
  );

  return <Context.Provider value={obj}>{children}</Context.Provider>;
}

export default ContextProvider;
