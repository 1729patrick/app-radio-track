import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export const INDICATOR_HEIGHT = 5;
export const INDICATOR_MARGIN_TOP = 10;
export const TIMING_DURATION = 300;

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: StyleGuide.palette.border,
    height: height,
    width,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  indicator: {
    width: 40,
    height: INDICATOR_HEIGHT,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: INDICATOR_MARGIN_TOP,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.secondary,
  },
  card: {
    paddingHorizontal: StyleGuide.spacing * 2,
    paddingTop: StyleGuide.spacing * 3,
  },
  title: {
    ...StyleGuide.typography.title1,
    color: StyleGuide.palette.primary,
    flexWrap: 'wrap',
    paddingRight: StyleGuide.spacing * 2,
  },

  winner: {
    width: width * 0.4,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
  },
  description: {
    ...StyleGuide.typography.title2,
    fontSize: 18,
    color: StyleGuide.palette.light,
    marginTop: StyleGuide.spacing * 5,
    lineHeight: 22,
    // letterSpacing: 1,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StyleGuide.spacing * 3,
  },
  star: {
    marginRight: StyleGuide.spacing * 2,
  },
});
