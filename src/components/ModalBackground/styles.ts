import { StyleSheet } from 'react-native';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette.border,
    },
    button: { height: '100%', width: '100%' },
  });
