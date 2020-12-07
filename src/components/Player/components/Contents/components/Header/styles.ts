import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from './constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    paddingBottom: 5,
    justifyContent: 'space-between',
  },

  tabIndicator: {
    backgroundColor: StyleGuide.palette.primary,
    height: 2,
    width: 100,
    position: 'absolute',
    bottom: 0,
  },
});
