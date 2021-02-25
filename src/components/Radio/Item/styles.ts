import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { IMAGE_SIZE, ITEM_HEIGHT } from './constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      height: ITEM_HEIGHT,
      paddingHorizontal: StyleGuide.spacing * 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      height: IMAGE_SIZE,
      width: IMAGE_SIZE,
      borderRadius: StyleGuide.borderRadius * 2.5,
      backgroundColor: palette.backgroundPrimary,
      borderWidth: 1,
      borderColor: palette.backgroundSecondary,
    },
    info: { flex: 1, paddingHorizontal: StyleGuide.spacing * 2 },
    title: {
      ...StyleGuide.typography.callout,
      color: palette.primary,
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.secondary,
    },
    playing: {
      marginLeft: 'auto',
      width: 30,
      height: 30,
    },
  });
