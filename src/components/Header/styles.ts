import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from './constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: StyleGuide.palette.background,
    paddingHorizontal: StyleGuide.spacing * 2,
    position: 'absolute',
    height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
  },
});
