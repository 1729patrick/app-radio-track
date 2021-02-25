import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    title: {
      ...StyleGuide.typography.tabBarLabel,
      color: palette.light,
      fontSize: 14,
      // textTransform: 'uppercase',
    },
  });
