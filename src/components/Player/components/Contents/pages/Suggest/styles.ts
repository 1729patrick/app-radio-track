import { Dimensions, StyleSheet } from 'react-native';
import { CARD_SIZE } from '~/components/Radio/Card/constants';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  contentContainer: {
    paddingBottom: StyleGuide.spacing * 4,
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingTop: StyleGuide.spacing * 4,
    paddingBottom: StyleGuide.spacing * 2,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  carouselContentContainer: {
    paddingHorizontal: (width - CARD_SIZE * 3) / 2,
  },
});
