import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    marginBottom: 55,
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingLeft: 16,
    color: StyleGuide.palette.primary,
  },
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
    marginTop: 15,
  },
});
