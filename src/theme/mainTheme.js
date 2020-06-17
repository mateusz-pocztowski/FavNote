const breakpoints = {
  smallTablet: 576,
  tablet: 768,
  desktop: 1200,
  smallDesktop: 996,
  bigDesktop: 1600,
};

export const theme = {
  notes: 'rgb(255, 216, 41)',
  notes100: 'rgb(255, 232, 128)',
  twitters: 'rgb(138, 216, 244)',
  twitters100: 'rgb(180, 230, 248)',
  articles: 'rgb(140, 206, 120)',
  articles100: 'rgb(191, 228, 180)',
  gray100: 'rgb(245, 245, 245)',
  gray200: 'rgb(230, 230, 230)',
  gray300: 'rgb(204, 204, 204)',
  gray400: 'rgb(190, 190, 190)',
  dark: 'rgb(38, 38, 38)',
  bold: 600,
  medium: 500,
  regular: 400,
  light: 300,
  fontSize: {
    xxs: '1rem',
    xs: '1.2rem',
    xsm: '1.4rem',
    s: '1.6rem',
    sm: '1.9rem',
    m: '2.1rem',
    l: '2.4rem',
    lm: '3rem',
    xl: '4rem',
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),
};
