import { lighten } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    title: {
      ...StyleGuide.typography.title1,
      paddingBottom: StyleGuide.spacing * 2,
      color: palette.primary,
      paddingHorizontal: StyleGuide.spacing * 2,
      width: '100%',
    },
    contentContainer: {
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    group: {
      width: width * 0.75,
      paddingRight: StyleGuide.spacing * 2,
    },
    region: {
      height: 50,
      width: '100%',
      borderRadius: StyleGuide.borderRadius * 1.5,
      marginVertical: StyleGuide.spacing * 0.75,
      backgroundColor: lighten(0.03, palette.backgroundPrimary),
      elevation: 4,
    },
    button: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: StyleGuide.spacing,
    },
    image: {
      width: 50,
      height: 50 / 1.5,
      borderRadius: StyleGuide.borderRadius,
    },
    regionTitle: {
      ...StyleGuide.typography.headline,
      paddingLeft: StyleGuide.borderRadius * 3,
      fontSize: 16,
      color: palette.primary,
    },
  });
