import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },

  contentContainer: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: 60,
  },
});
