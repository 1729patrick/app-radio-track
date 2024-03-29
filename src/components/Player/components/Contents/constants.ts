import { lighten } from 'polished';
import { Dimensions } from 'react-native';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';
import { palette } from '~/utils/StyleGuide';

import { COMPACT_HEIGHT } from '../../constants';

const { height } = Dimensions.get('window');

export const SNAP_POINTS = [
  COMPACT_HEIGHT + STATUS_BAR_HEIGHT,
  height - COMPACT_HEIGHT,
];

export const INDICATOR_HEIGHT = 5;
export const INDICATOR_MARGIN_TOP = 10;
export const TIMING_DURATION = 300;
