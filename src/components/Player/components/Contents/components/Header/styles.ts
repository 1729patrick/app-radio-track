import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: COMPACT_HEIGHT,
    justifyContent: 'space-between',
  },

  tabIndicator: {
    backgroundColor: StyleGuide.palette.app,
    height: 2,
    width: 100,
    position: 'absolute',
    bottom: 0,
    top: COMPACT_HEIGHT - 2,
  },
});
