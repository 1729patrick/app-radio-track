import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { TAB_BAR_HEIGHT } from '~/components/TabBar/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },

  contentContainer: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: TAB_BAR_HEIGHT + COMPACT_HEIGHT - 25,
  },
});
