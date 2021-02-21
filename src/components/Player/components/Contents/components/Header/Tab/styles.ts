import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default (palette) =>
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
