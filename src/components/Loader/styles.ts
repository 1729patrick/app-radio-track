import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { BOTTOM_TAB_BAR_HEIGHT } from '../TabBar/bottom/constants';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
    backgroundColor: StyleGuide.palette.background,
    zIndex: 1,
  },
});
