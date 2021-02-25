import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

import { CONTROLS_TOP_HEIGHT } from './components/Controls/Top/constants';
import { COMPACT_HEIGHT } from './constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    player: {
      backgroundColor: palette.backgroundPrimary,
      justifyContent: 'center',
      width,
      height,
      paddingBottom: COMPACT_HEIGHT,
      paddingTop: CONTROLS_TOP_HEIGHT,
      elevation: 10,
    },
  });
