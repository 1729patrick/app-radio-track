import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      paddingTop: 25,
      flexGrow: 1,
      backgroundColor: palette.background,
    },
    contentContainer: {
      flexGrow: 1,
      paddingTop: 70,
      paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT - 25,
    },
  });
