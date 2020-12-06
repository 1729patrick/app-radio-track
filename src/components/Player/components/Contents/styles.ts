import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: { backgroundColor: StyleGuide.palette.border, height, width },
  indicator: {
    width: 50,
    height: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.secondary,
  },
  header: { flexDirection: 'row', height: 50, marginTop: 5 },
  tab: {
    ...StyleGuide.typography.tabBarLabel,
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: StyleGuide.palette.light,
    // textTransform: 'uppercase',
  },
  tabIndicator: {
    backgroundColor: StyleGuide.palette.primary,
    height: 2,
    width: 100,
  },
});
