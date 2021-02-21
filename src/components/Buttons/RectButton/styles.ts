import { lighten } from 'polished';
import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default (palette) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      borderRadius: StyleGuide.borderRadius * 2,
      overflow: 'hidden',
      backgroundColor: lighten(0.1, palette.backgroundPrimary),
    },
    button: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...StyleGuide.typography.headline,
      color: palette.primary,
      fontSize: 15,
      letterSpacing: 0.7,
      paddingBottom: 1,
    },
  });
