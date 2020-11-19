import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { HEIGHT } from './constants';

export default StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    right: 0,
    left: 0,
    zIndex: 60,
    elevation: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopColor: StyleGuide.palette.border,
    borderTopWidth: 1,
  },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    ...StyleGuide.typography.tabBarLabel,
    color: StyleGuide.palette.primary,
    marginTop: 2,
  },
});
