import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const MODAL_SNAP_POINTS = [0, height * 0.45, height];
export const MODAL_PADDING_TOP = 300;
export const MODAL_TIMING_DURATION = 200;
