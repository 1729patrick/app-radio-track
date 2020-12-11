import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingBottom: StyleGuide.spacing * 4,
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingTop: StyleGuide.spacing * 4,
    paddingBottom: StyleGuide.spacing * 2,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  carouselContentContainer: { paddingHorizontal: StyleGuide.spacing },
});
