import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width, height } = Dimensions.get('window');

const WAVE_HEIGHT = (width * 320) / 1440;
const BOTTOM_CONTAINER_HEIGHT = 250;
export default StyleSheet.create({
  container: {
    flexGrow: 1,

    // justifyContent: 'center',
  },
  containerTop: {
    height: height - BOTTOM_CONTAINER_HEIGHT,
    zIndex: 20,
    justifyContent: 'flex-end',
    backgroundColor: StyleGuide.palette.background,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  waves: {
    position: 'absolute',
    width,
    height: WAVE_HEIGHT,
    top: height - BOTTOM_CONTAINER_HEIGHT,
  },
  robot: {
    width: '100%',
    marginTop: -15,
    zIndex: -1,
  },
  title: {
    ...StyleGuide.typography.title1,
    fontSize: 24,
    color: StyleGuide.palette.primary,
  },
  description: {
    ...StyleGuide.typography.subhead,
    fontSize: 16,
    color: StyleGuide.palette.primary,
    marginTop: StyleGuide.spacing * 2,
    width: '80%',
  },
  containerBottom: {
    paddingHorizontal: StyleGuide.spacing * 2,
    backgroundColor: StyleGuide.palette.primary,
    height: BOTTOM_CONTAINER_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.background,
  },
  containerButtonChoose: {
    marginTop: WAVE_HEIGHT,
    backgroundColor: StyleGuide.palette.background,
  },
  titleButtonSkip: {
    color: StyleGuide.palette.background,
  },
});
