import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT, PADDING_HORIZONTAL } from '~/screens/Player/constants';

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
    paddingHorizontal: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000001',
  },
});
