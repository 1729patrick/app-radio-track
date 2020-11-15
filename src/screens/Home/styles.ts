import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from './constants';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  header: {
    justifyContent: 'center',

    backgroundColor: StyleGuide.palette.background,
    paddingHorizontal: StyleGuide.spacing * 2,
    position: 'absolute',
    height: HEADER_HEIGHT,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 105,
    paddingBottom: 60,
  },
});
