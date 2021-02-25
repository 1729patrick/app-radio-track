import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: StyleGuide.spacing * 4,
    },
    title: {
      ...StyleGuide.typography.title1,
      paddingTop: StyleGuide.spacing * 4,
      paddingBottom: StyleGuide.spacing * 2,
      paddingHorizontal: StyleGuide.spacing * 2,
      color: palette.primary,
    },
    carouselContentContainer: {
      paddingHorizontal: StyleGuide.spacing,
    },
  });
