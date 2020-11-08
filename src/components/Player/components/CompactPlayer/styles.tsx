import { StyleSheet } from 'react-native';
import { COMPACT_HEIGHT } from '../../constants';

export default StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: COMPACT_HEIGHT,
    width: '100%',
    zIndex: 1,
  },
  compactButton: {
    flex: 1,
    paddingLeft: COMPACT_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  info: { justifyContent: 'center', flex: 1 },
  title: {
    fontWeight: '900',
    fontSize: 20,
  },
  description: {},
  controls: { flexDirection: 'row' },
  button: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
});
