import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    title: {
      ...StyleGuide.typography.headline,
      fontSize: 13,
      letterSpacing: 0.6,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: palette.light,
      marginVertical: StyleGuide.spacing * 4,
    },
    disabled: {
      opacity: 0.5,
    },
  });
