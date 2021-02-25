import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: 25,
      backgroundColor: palette.background,
    },
    contentContainer: {
      flexGrow: 1,
      paddingTop: STATUS_BAR_HEIGHT + HEADER_HEIGHT,
      paddingBottom:
        BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT + StyleGuide.spacing * 0.5,
    },
  });
