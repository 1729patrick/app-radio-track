import { Dimensions } from 'react-native';
import { COMPACT_HEIGHT } from '../../constants';
import { ARTIST_HEIGHT } from '../Artist/constants';
import { CONTROLS_BOTTOM_HEIGHT } from '../Controls/Bottom/constants';
import { CONTROLS_TOP_HEIGHT } from '../Controls/Top/constants';

const { height, width } = Dimensions.get('window');
export const ALBUM_HEIGHT_SIZE =
  height -
  CONTROLS_BOTTOM_HEIGHT -
  ARTIST_HEIGHT -
  CONTROLS_TOP_HEIGHT -
  COMPACT_HEIGHT +
  15;

export const ALBUM_SIZE = Math.min(width, ALBUM_HEIGHT_SIZE);
