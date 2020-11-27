import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { TOP_TAB_BAR_HEIGHT } from '~/components/TabBar/top/constants';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/bottom/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
    paddingTop: TOP_TAB_BAR_HEIGHT + HEADER_HEIGHT + STATUS_BAR_HEIGHT,
  },
});