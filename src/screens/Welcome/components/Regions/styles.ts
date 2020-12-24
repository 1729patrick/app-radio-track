import { Dimensions, StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { INDICATOR_TOTAL_HEIGHT } from '~/components/Indicator/constants';
import StyleGuide from '~/utils/StyleGuide';
import { REGIONS_PADDING_TOP } from './constants';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    backgroundColor: StyleGuide.palette.backgroundSecondary,
    position: 'absolute',
    top: REGIONS_PADDING_TOP - HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    width: '100%',
    height,
    borderTopRightRadius: StyleGuide.borderRadius * 3,
    borderTopLeftRadius: StyleGuide.borderRadius * 3,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    marginTop: STATUS_BAR_HEIGHT - INDICATOR_TOTAL_HEIGHT,
    height: HEADER_HEIGHT,
    textAlignVertical: 'center',
  },
  content: {
    paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  contentContainer: {
    paddingTop: REGIONS_PADDING_TOP - HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
});
