import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { INDICATOR_HEIGHT, INDICATOR_MARGIN_TOP } from './constants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
  },
  content: {
    backgroundColor: StyleGuide.palette.border,
    height: height,
    width,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  indicator: {
    width: 40,
    height: INDICATOR_HEIGHT,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: INDICATOR_MARGIN_TOP,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.secondary,
  },
  compactPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
