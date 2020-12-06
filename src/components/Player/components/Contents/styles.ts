import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { SNAP_POINTS } from './constants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
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
    height: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.secondary,
  },
  header: { flexDirection: 'row', height: 47, paddingBottom: 5 },
  tab: {
    ...StyleGuide.typography.tabBarLabel,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: StyleGuide.palette.light,
    textTransform: 'uppercase',
  },
  tabIndicator: {
    backgroundColor: StyleGuide.palette.primary,
    height: 2,
    width: 100,
    position: 'absolute',
    bottom: 0,
  },
});
