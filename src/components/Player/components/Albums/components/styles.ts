import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { ALBUM_SIZE } from '../constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    width: width,
    height: ALBUM_SIZE,
  },
  image: {
    width: ALBUM_SIZE - 70,
    height: ALBUM_SIZE - 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: StyleGuide.borderRadius * 5,
    backgroundColor: StyleGuide.palette.background,
  },
  notFoundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.border,
    width: ALBUM_SIZE - 70,
    height: ALBUM_SIZE - 70,
    top: 35,
    left: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
    borderRadius: StyleGuide.borderRadius,
  },
  notFound: {
    width: ALBUM_SIZE - 140,
  },
  notFoundTitle: {
    textAlign: 'center',
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    flex: 1,
    textAlignVertical: 'center',
  },
});
