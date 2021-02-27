import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
    paddingTop: HEADER_HEIGHT + StyleGuide.spacing,
  },
});
