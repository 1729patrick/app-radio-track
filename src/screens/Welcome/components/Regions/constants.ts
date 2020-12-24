import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const REGIONS_SNAP_POINTS = [0, height - 200];
export const REGIONS_PADDING_TOP = 300;
export const REGIONS_TIMING_DURATION = 250;
