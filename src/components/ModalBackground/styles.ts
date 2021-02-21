import { StyleSheet } from 'react-native';

export default (palette) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette.border,
    },
    button: { height: '100%', width: '100%' },
  });
