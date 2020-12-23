import { darken } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export const INDICATOR_HEIGHT = 5;
export const INDICATOR_MARGIN_TOP = 10;
export const TIMING_DURATION = 300;

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.border,
  },
  fakeBackground: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: StyleGuide.palette.background,
    height: height / 2,
    marginTop: 'auto',
    width,
  },
  content: {
    backgroundColor: StyleGuide.palette.background,
    width,
    borderTopRightRadius: StyleGuide.borderRadius * 3,
    borderTopLeftRadius: StyleGuide.borderRadius * 3,
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
    zIndex: 2,
  },

  winner: {
    width: width * 0.6,
    marginTop: -StyleGuide.spacing * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
  },
  description: {
    ...StyleGuide.typography.callout,
    fontSize: 16,
    color: darken(0.2, StyleGuide.palette.primary),
    marginTop: StyleGuide.spacing,
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
