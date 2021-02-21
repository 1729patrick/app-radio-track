import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default (palette) =>
  StyleSheet.create({
    container: {
      paddingVertical: StyleGuide.spacing,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    info: { flexDirection: 'row', alignItems: 'center' },
    image: {
      width: 50,
      height: 50 / 1.5,
      borderRadius: StyleGuide.borderRadius,
    },
    title: {
      ...StyleGuide.typography.headline,
      paddingLeft: StyleGuide.borderRadius * 3,
      fontSize: 16,
      color: palette.primary,
    },
  });
