import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      backgroundColor: palette.background,
      flex: 1,
    },
    contentContainer: {
      paddingVertical: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    title: {
      ...StyleGuide.typography.title2,
      color: palette.primary,
      marginTop: StyleGuide.spacing * 2,
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.primary,
      marginTop: StyleGuide.spacing * 3,
    },
  });
