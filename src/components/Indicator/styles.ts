import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { INDICATOR_HEIGHT, INDICATOR_MARGIN_TOP } from './constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      width: 40,
      height: INDICATOR_HEIGHT,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: INDICATOR_MARGIN_TOP,
      borderRadius: StyleGuide.borderRadius,
      backgroundColor: palette.secondary,
    },
  });
