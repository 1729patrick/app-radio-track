import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      backgroundColor: palette.background,
      flex: 1,
    },
    contentContainer: {
      paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
      paddingBottom:
        BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT + StyleGuide.spacing * 3,
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
