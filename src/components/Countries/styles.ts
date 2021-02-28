import { StyleSheet } from 'react-native';
import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      backgroundColor: palette.backgroundSecondary,
    },
    country: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {},
  });
