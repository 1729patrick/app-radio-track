import { StyleSheet, Dimensions } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from '../Header/constants';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    zIndex: 1,
    paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
  },
  animation: {
    width: width,
    height: width,
  },
});
