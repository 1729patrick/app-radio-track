import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { SNAP_POINTS } from './constants';

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
    height: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.secondary,
  },
});
