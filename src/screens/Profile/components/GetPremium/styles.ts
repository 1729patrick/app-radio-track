import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    title: {
      ...StyleGuide.typography.title1,
      textAlign: 'center',
      color: palette.primary,
      paddingHorizontal: StyleGuide.spacing * 3,
      paddingTop: StyleGuide.spacing,
    },
    advantageCard: {
      marginTop: StyleGuide.spacing * 1.5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    advantages: {
      marginTop: StyleGuide.spacing * 3,
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    advantageTitle: {
      ...StyleGuide.typography.callout,
      color: palette.primary,
      marginLeft: StyleGuide.spacing * 1.5,
    },
    containerBottom: {
      marginTop: StyleGuide.spacing * 4,
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    line: {
      backgroundColor: palette.backgroundSecondary,
      width: '100%',
      height: 1,
      marginTop: StyleGuide.spacing * 2,
    },
  });
