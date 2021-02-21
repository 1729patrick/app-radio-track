import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default (palette) =>
  StyleSheet.create({
    container: {
      textAlign: 'center',
      alignItems: 'center',
    },
    info: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 35,
      paddingTop: 17,
    },
    title: {
      ...StyleGuide.typography.title1,
      color: palette.primary,
      textAlign: 'center',
      paddingBottom: 10,
    },
    description: {
      textAlign: 'center',
      ...StyleGuide.typography.subhead,
      fontSize: 16,
      color: palette.secondary,
    },
  });
