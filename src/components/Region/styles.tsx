import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      paddingVertical: StyleGuide.spacing * 1.5,
      flexDirection: 'row',
      alignItems: 'center',
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
