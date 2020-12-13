import { rgba } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export const INDICATOR_HEIGHT = 5;
export const INDICATOR_MARGIN_TOP = 10;
export const TIMING_DURATION = 300;

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    backgroundColor: StyleGuide.palette.backgroundPrimary,
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
    borderRadius: StyleGuide.borderRadius,
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
    width: width * 0.6,
    marginTop: -StyleGuide.spacing * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
  },
  description: {
    ...StyleGuide.typography.title2,
    fontSize: 18,
    color: '#ddd',
    marginTop: StyleGuide.spacing,
    lineHeight: 22,
    // letterSpacing: 1,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: StyleGuide.spacing * 4,
  },
  star: {},
  fiveStarContainer: { position: 'absolute', top: 0, width: '100%' },
});
