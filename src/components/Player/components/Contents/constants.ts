import { Dimensions } from 'react-native';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '../../constants';

const { height } = Dimensions.get('window');

export const SNAP_POINTS = [
  COMPACT_HEIGHT + STATUS_BAR_HEIGHT,
  height - COMPACT_HEIGHT,
];
