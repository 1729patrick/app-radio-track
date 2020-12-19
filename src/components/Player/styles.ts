import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { height, width } = Dimensions.get('window');

import { CONTROLS_TOP_HEIGHT } from './components/Controls/Top/constants';
import { COMPACT_HEIGHT } from './constants';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  player: {
    justifyContent: 'center',
    width,
    height,
    paddingBottom: COMPACT_HEIGHT,
    paddingTop: CONTROLS_TOP_HEIGHT,
    elevation: 30,
  },
});
