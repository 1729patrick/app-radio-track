import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const ARTIST_AND_CONTROL_HEIGHT = 171 + 2.5;
export const COMPACT_HEIGHT = 60;
export const SNAP_POINTS = [0, height - COMPACT_HEIGHT - 55, height];
export const TIMING_DURATION = 400;
export const PADDING_HORIZONTAL = 20;
