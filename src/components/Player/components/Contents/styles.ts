import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import {
  BACKGROUND_COLOR,
  INDICATOR_HEIGHT,
  INDICATOR_MARGIN_TOP,
} from './constants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
  },
  content: {
    backgroundColor: BACKGROUND_COLOR,
    height: height,
    width,
    borderTopRightRadius: StyleGuide.borderRadius * 3,
    borderTopLeftRadius: StyleGuide.borderRadius * 3,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  indicator: {
    width: 40,
    height: INDICATOR_HEIGHT,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: INDICATOR_MARGIN_TOP,
    borderRadius: StyleGuide.borderRadius,
    backgroundColor: StyleGuide.palette.secondary,
  },
  compactPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
