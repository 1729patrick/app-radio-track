import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '~/screens/Player/constants';

export default StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    paddingLeft: COMPACT_HEIGHT,
    paddingRight: 20,
    height: COMPACT_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  info: { justifyContent: 'center' },
  title: {
    fontWeight: '900',
    fontSize: 20,
  },
  description: {},
  controls: { flexDirection: 'row' },
  playPause: { marginLeft: 20 },
});
