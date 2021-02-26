const dark = {
  primary: '#eeeeee',
  secondary: '#A0A2A7',
  light: '#BFC1C4',
  background: '#1d1e21',
  backgroundPrimary: '#222326',
  backgroundSecondary: '#303137',
  border: '#27282c',
  app: '#16CA61',
};

const light = {
  primary: '#222326',
  secondary: '#6d6e7c',
  light: '#808080',
  background: '#fafafa',
  backgroundPrimary: '#fafafa',
  backgroundSecondary: '#f1f1f1',
  border: '#EAEAEA',
  app: '#16CA61',
};

export const palette = { dark, light };

const StyleGuide = {
  spacing: 8,
  borderRadius: 4,
  palette: dark,
  typography: {
    body: {
      fontSize: 17,
      // lineHeight: 20,
    },
    callout: {
      fontSize: 15,
      fontFamily: 'Montserrat-SemiBold',
    },
    caption: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
    headline: {
      fontSize: 16,
      // lineHeight: 22,
      fontFamily: 'Montserrat-SemiBold',
    },
    subhead: {
      fontSize: 14,
      // lineHeight: 20,
      fontFamily: 'Montserrat-Medium',
      letterSpacing: -0.11,
    },
    title1: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 21,
      // lineHeight: 41,
      letterSpacing: 0.21,
    },
    title2: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 20,
      // lineHeight: 22,
      // letterSpacing: 0.22,
    },
    title3: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
      // lineHeight: 22,
      letterSpacing: 0.21,
    },
    tabBarLabel: {
      fontSize: 13,
      fontFamily: 'Montserrat-SemiBold',
    },
  },
};

export default StyleGuide;
