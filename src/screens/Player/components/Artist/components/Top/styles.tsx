import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    paddingLeft: 80,
    paddingRight: 20,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  info: {},
  title: {
    fontWeight: '900',
    fontSize: 20,
  },
  description: {},
  controls: { flexDirection: 'row' },
  playPause: { marginRight: 20 },
});
