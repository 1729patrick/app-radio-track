import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingLeft: 15,
    color: StyleGuide.palette.primary,
  },
  contentContainer: {
    paddingHorizontal: 5,
    marginTop: 25,
  },
});
