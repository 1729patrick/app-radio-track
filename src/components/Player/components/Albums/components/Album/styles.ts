import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { ALBUM_SIZE } from '../../constants';

const { width } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    card: {
      width: width,
      height: ALBUM_SIZE,
      overflow: 'hidden',
    },
    image: {
      width: ALBUM_SIZE - 70,
      height: ALBUM_SIZE - 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: StyleGuide.borderRadius * 5,
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.backgroundSecondary,
    },
    notFoundContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette.border,
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
      color: palette.primary,
      flex: 1,
      textAlignVertical: 'center',
    },
  });
