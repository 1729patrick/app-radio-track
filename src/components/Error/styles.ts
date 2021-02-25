import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.background,
      zIndex: -1,
    },
    title: {
      ...StyleGuide.typography.title2,
      color: palette.primary,
      textAlign: 'center',
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.light,
      marginTop: 5,
      textAlign: 'center',
    },
  });
