import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '../../../constants';

export default StyleSheet.create({
  container: {
    top: 25,
    left: 0,
    position: 'absolute',
    height: COMPACT_HEIGHT,
    width: '100%',
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
