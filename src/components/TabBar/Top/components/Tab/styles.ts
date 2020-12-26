import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  title: {
    ...StyleGuide.typography.tabBarLabel,
    fontSize: 15,
  },
  tab: {
    paddingHorizontal: StyleGuide.spacing * 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
