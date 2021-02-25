import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: StyleGuide.spacing * 2,
      paddingBottom: StyleGuide.spacing * 1.5,
      paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    },
    input: { marginTop: StyleGuide.spacing * 2 },
    containerButton: {
      backgroundColor: palette.app,
      marginTop: StyleGuide.spacing * 3,
    },
    contentContainer: {
      paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
    },
  });
