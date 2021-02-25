import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {},
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: StyleGuide.spacing * 2,
      height: 50,
    },
    title: {
      ...StyleGuide.typography.subhead,
      paddingHorizontal: StyleGuide.spacing * 2,
      color: palette.primary,
      flex: 1,
    },
  });
