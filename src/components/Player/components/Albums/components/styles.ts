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
  notFoundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.border,
    width: width - 70,
    height: width - 70,
    top: 35,
    left: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
    borderRadius: 4,
  },
  notFound: {
    width: width - 140,
  },
  notFoundTitle: {
    textAlign: 'center',
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    flex: 1,
    textAlignVertical: 'center',
  },
});
