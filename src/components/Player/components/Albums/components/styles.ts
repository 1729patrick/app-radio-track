import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    width: width,
    height: width,
    padding: 35,
  },
  image: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.background,
  },
});
