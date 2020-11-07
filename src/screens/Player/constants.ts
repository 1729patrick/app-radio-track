import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const ARTIST_AND_CONTROL_HEIGHT = 181;
export const COMPACT_HEIGHT = 65;
export const SNAP_POINTS = [0, height - COMPACT_HEIGHT, height];
export const TIMING_DURATION = 100;
export const HORIZONTAL_PADDING = 20;
