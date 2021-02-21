import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
  },
  screenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: StyleGuide.spacing * 2,
    paddingVertical: StyleGuide.spacing * 2,
  },
  screenInfo: { flexDirection: 'column' },
  screenTitle: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.primary,
    marginLeft: StyleGuide.spacing * 1.5,
  },
});
