import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width, height } = Dimensions.get('window');
const WAVE_HEIGHT = (width * 320) / 1440;
const BOTTOM_CONTAINER_HEIGHT = 250;

const TITLE_AND_DESCRIPTION_HEIGHT = 89.5;

const ROBOT_WIDTH = width - StyleGuide.spacing * 2;
const ROBOT_HEIGHT = (ROBOT_WIDTH * 313) / 328;

const ADJUST_ROBOT_WIDTH =
  height -
  BOTTOM_CONTAINER_HEIGHT -
  TITLE_AND_DESCRIPTION_HEIGHT -
  ROBOT_HEIGHT -
  50;

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  containerTop: {
    height: height - BOTTOM_CONTAINER_HEIGHT,
    justifyContent: 'center',
    backgroundColor: '#1d1e21',
    paddingHorizontal: StyleGuide.spacing * 2,
    paddingTop: height * 0.1,
  },
  waves: {
    position: 'absolute',
    height: WAVE_HEIGHT,
    left: 0,
    right: 0,
    top: height - BOTTOM_CONTAINER_HEIGHT - 1,
  },
  robot: {
    width: Math.min(ROBOT_WIDTH + ADJUST_ROBOT_WIDTH, ROBOT_WIDTH),
    marginTop: -15,
    zIndex: -1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    ...StyleGuide.typography.title1,
    fontSize: 24,
    color: '#fff',
  },
  description: {
    ...StyleGuide.typography.subhead,
    fontSize: 16,
    color: '#fff',
    marginTop: StyleGuide.spacing * 2,
    width: '80%',
  },
  containerBottom: {
    paddingHorizontal: StyleGuide.spacing * 2,
    backgroundColor: '#fff',
    height: BOTTOM_CONTAINER_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.background,
  },
  containerButtonChoose: {
    marginTop: WAVE_HEIGHT,
    backgroundColor: '#1d1e21',
  },
  titleButtonChoose: { color: '#fff' },
  titleButtonSkip: {
    color: '#1d1e21',
  },
});
