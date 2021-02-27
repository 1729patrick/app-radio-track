import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: StyleGuide.spacing * 2,
      height: 63,
    },
    info: { flexDirection: 'column', marginLeft: StyleGuide.spacing * 1.5 },
    title: {
      ...StyleGuide.typography.callout,
      color: palette.primary,
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.secondary,
    },
    checkbox: { marginLeft: 'auto' },
  });
