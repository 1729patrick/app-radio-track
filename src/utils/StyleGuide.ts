// AirbnbCerealApp-Light
// Montserrat-Medium
// Montserrat-SemiBold
// AirbnbCerealApp-Bold
// Montserrat-Bold
// AirbnbCerealApp-Black

import { lighten } from 'polished';

// <string>Montserrat-Black.ttf</string>
// <string>Montserrat-BlackItalic.ttf</string>
// <string>Montserrat-Bold.ttf</string>
// <string>Montserrat-BoldItalic.ttf</string>
// <string>Montserrat-ExtraBold.ttf</string>
// <string>Montserrat-ExtraBoldItalic.ttf</string>
// <string>Montserrat-ExtraLight.ttf</string>
// <string>Montserrat-ExtraLightItalic.ttf</string>
// <string>Montserrat-Italic.ttf</string>
// <string>Montserrat-Light.ttf</string>
// <string>Montserrat-LightItalic.ttf</string>
// <string>Montserrat-Medium.ttf</string>
// <string>Montserrat-MediumItalic.ttf</string>
// <string>Montserrat-Regular.ttf</string>
// <string>Montserrat-SemiBold.ttf</string>
// <string>Montserrat-SemiBoldItalic.ttf</string>
// <string>Montserrat-Thin.ttf</string>
// <string>Montserrat-ThinItalic.ttf</string>

// #6d6e7c
const background = '#1d1e21';

// const x = lighten(0.02, background);
// console.log(x);
const StyleGuide = {
  spacing: 8,
  borderRadius: 4,
  palette: {
    primary: '#fff',
    secondary: '#A0A2A7',
    light: '#BFC1C4',
    background,
    backgroundPrimary: '#222326',
    backgroundSecondary: '#303137',
    border: '#27282c',
    app: '#16CA61',
  },
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
