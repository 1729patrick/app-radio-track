import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from './constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: StyleGuide.spacing * 2,
    position: 'absolute',
    height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: StyleGuide.spacing * 2,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
  },
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
