import { Dimensions, StyleSheet } from 'react-native';

import { ALBUM_SIZE } from './constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width,
    height: ALBUM_SIZE - 70,
    zIndex: 3,
  },
});
