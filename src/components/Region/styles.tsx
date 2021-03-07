import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: StyleGuide.spacing * 2,
      height: 55,
    },
    info: { flexDirection: 'row', alignItems: 'center' },
    image: {
      width: 47,
      height: 47 / 1.5,
      borderRadius: StyleGuide.borderRadius,
      marginRight: StyleGuide.borderRadius * 3,
    },
    title: {
      ...StyleGuide.typography.headline,
      fontSize: 16,
      color: palette.primary,
    },
    disabled: { opacity: 0.3 },
  });
