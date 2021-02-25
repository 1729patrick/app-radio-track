import { lighten } from 'polished';
import { StyleSheet } from 'react-native';
import StyleGuide, { palette } from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleGuide.typography.caption,
      marginTop: StyleGuide.spacing * 5,
      backgroundColor: lighten(0.1, palette.backgroundPrimary),
      paddingLeft: StyleGuide.spacing * 1.5,
      borderRadius: StyleGuide.borderRadius * 2,
    },
  });
