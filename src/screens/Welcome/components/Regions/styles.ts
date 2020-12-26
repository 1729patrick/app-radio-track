import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { INDICATOR_TOTAL_HEIGHT } from '~/components/Indicator/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  fakeBackground: {},
  contentContainer: {
    backgroundColor: StyleGuide.palette.backgroundSecondary,

    marginTop: -1,
  },
  header: {
    backgroundColor: StyleGuide.palette.backgroundSecondary,
    paddingHorizontal: StyleGuide.spacing * 2,
    zIndex: 2,
    height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    borderTopRightRadius: StyleGuide.borderRadius * 3,
    borderTopLeftRadius: StyleGuide.borderRadius * 3,
  },
  headerContent: {
    flexDirection: 'row',
    marginTop: STATUS_BAR_HEIGHT - INDICATOR_TOTAL_HEIGHT,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: StyleGuide.spacing,
  },
  titleButtonOK: {
    color: StyleGuide.palette.app,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
  },
});