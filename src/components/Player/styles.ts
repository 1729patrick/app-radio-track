import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

import { SNAP_POINTS as CONTENT_SNAP_POINTS } from './components/Contents/constants';
import { CONTROLS_TOP_HEIGHT } from './components/Controls/Top/constants';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  player: {
    justifyContent: 'center',
    width,
    height,
    paddingBottom: CONTENT_SNAP_POINTS[0] - 25,

    paddingTop: CONTROLS_TOP_HEIGHT - 35,
  },
});
