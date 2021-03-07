import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import { PalleteType } from '~/contexts/ThemeContext';
import StyleGuide from '~/utils/StyleGuide';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
      alignItems: 'center',

      flex: 1,
      paddingBottom:
        COMPACT_HEIGHT + BOTTOM_TAB_BAR_HEIGHT + StyleGuide.spacing * 3,
    },
    logo: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      ...StyleGuide.typography.caption,
      color: palette.primary,
      marginBottom: StyleGuide.spacing,
      textAlign: 'center',
    },
  });
