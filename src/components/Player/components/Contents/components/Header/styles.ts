import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 47,
    paddingBottom: 5,
    justifyContent: 'space-between',
  },

  tabIndicator: {
    backgroundColor: StyleGuide.palette.primary,
    height: 2,
    width: 100,
    position: 'absolute',
    bottom: 0,
  },
});
