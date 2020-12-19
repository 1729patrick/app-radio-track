import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { BOTTOM_TAB_BAR_HEIGHT } from './constants';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: BOTTOM_TAB_BAR_HEIGHT,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    right: 0,
    left: 0,
    top: height - BOTTOM_TAB_BAR_HEIGHT,
    zIndex: 60,
    elevation: 60,
    position: 'absolute',
    flexDirection: 'row',
    borderTopColor: StyleGuide.palette.border,
    borderTopWidth: 1.5,
  },
  tab: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  title: {
    ...StyleGuide.typography.tabBarLabel,
    color: StyleGuide.palette.primary,
    marginTop: 3,
    marginBottom: 8,
  },
});
