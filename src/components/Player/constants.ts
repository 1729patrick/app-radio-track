import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const ARTIST_AND_CONTROL_HEIGHT = 167;
export const COMPACT_HEIGHT = 60;
export const SNAP_POINTS = [0, height - COMPACT_HEIGHT - 55, height];
export const TIMING_DURATION = 200;
export const PADDING_HORIZONTAL = 20;
