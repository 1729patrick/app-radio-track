import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { COMPACT_HEIGHT } from '../../../constants';

export default StyleSheet.create({
  container: {
    top: 20,
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
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    paddingHorizontal: StyleGuide.spacing * 2,
    flex: 1,
    textAlign: 'center',
  },
});
