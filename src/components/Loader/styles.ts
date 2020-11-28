import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from '../Header/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '../TabBar/bottom/constants';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
    backgroundColor: StyleGuide.palette.background,
    zIndex: 1,
  },
});
