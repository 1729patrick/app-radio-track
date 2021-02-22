import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';

export default StyleSheet.create({
  container: { paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT },
  contentContainer: {
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
  },
});
