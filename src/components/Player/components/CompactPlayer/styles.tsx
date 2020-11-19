import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { COMPACT_HEIGHT } from '../../constants';

const { width } = Dimensions.get('window');

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
    paddingRight: 5,
  },
  info: { justifyContent: 'center', flex: 1 },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    paddingRight: StyleGuide.spacing * 2,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
  controls: { flexDirection: 'row', alignItems: 'center' },
  buttonContainer: {
    height: COMPACT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  playButton: { paddingLeft: 3 },
  stopButton: { paddingLeft: 2 },
  loader: {
    position: 'absolute',
    height: 90,
    width: 90,
  },
  background: {
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    position: 'absolute',
    width: width,
    height: COMPACT_HEIGHT,
    top: 0,
  },
});
