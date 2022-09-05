import { createStitches } from '@stitches/react';

export const { createTheme, globalCss, styled } = createStitches({
  theme: {
    colors: {
      hiContrast: 'hsl(206,10%,5%)',
      loContrast: 'white',

      gray100: 'hsl(206,22%,99%)',
      gray200: 'hsl(206,12%,97%)',
      gray300: 'hsl(206,11%,92%)',
      gray400: 'hsl(206,10%,84%)',
      gray500: 'hsl(206,10%,76%)',
      gray600: 'hsl(206,10%,44%)',

      background: '#333333',
      backgroundSecondary: '#FFEEF2',
      textPrimary: '#FCFCFC',
      textSecondary: '#B191FF',
      box: '#FFFFFF',
      sidebar: '#B191FF',
      sidebarHover: '#ECECEC',
      backgroundGradient: 'linear-gradient(45deg, #B191FF, #BD2D87)',

      navbarBackground: 'transparent',
      navbarMenuText: '#FFF',
    },
  },
});

export const darkTheme = createTheme('dark-theme', {
  colors: {
    hiContrast: 'hsl(206,2%,93%)',
    loContrast: 'hsl(206,8%,8%)',

    gray100: 'hsl(206,8%,12%)',
    gray200: 'hsl(206,7%,14%)',
    gray300: 'hsl(206,7%,15%)',
    gray400: 'hsl(206,7%,24%)',
    gray500: 'hsl(206,7%,30%)',
    gray600: 'hsl(206,5%,53%)',

    background: '#343434',
    backgroundSecondary: '#595758',
    textPrimary: '#EEEEEE',
    textSecondary: '#7954A1',
    box: '#C55FFC',

    sidebar: '#C55FFC',
    sidebarHover: '#ECECECA1',

    backgroundHeaderImg: 'url("src/Assets/images/backgroundHeaderDark.jpg")',
  },
});

const globalStyles = globalCss({
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    fontFamily: '"Roboto", sans-serif;"',
  },

  html: {
    height: '100vh',
    background: '$background',
  },

  body: {
    width: '100%',
    height: '100vh',
    color: '$textPrimary',
    background: '$background',
  },

  'div#root': {
    width: '100%',
    height: '100vh',
  },
});

globalStyles();
