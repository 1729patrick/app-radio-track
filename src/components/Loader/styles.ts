import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { TAB_BAR_HEIGHT } from '../TabBar/constants';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: TAB_BAR_HEIGHT,
    backgroundColor: StyleGuide.palette.background,
    zIndex: 1,
  },
});
