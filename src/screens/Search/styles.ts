import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from '~/components/TabBar/Bottom/constants';
import StyleGuide from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette.background,
      zIndex: 2,
    },
    header: {
      paddingTop: 25,
      backgroundColor: palette.backgroundPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: StyleGuide.spacing * 2,
      elevation: 5,
    },
    input: {
      ...StyleGuide.typography.caption,
      flex: 1,
      paddingLeft: StyleGuide.spacing * 2,
      color: palette.primary,
    },
    notFound: {
      paddingBottom: STATUS_BAR_HEIGHT + HEADER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notFoundTitle: {
      ...StyleGuide.typography.title2,
      color: palette.primary,
      textAlign: 'center',
    },
    notFoundDescription: {
      ...StyleGuide.typography.subhead,
      color: palette.light,
      marginTop: 5,
      textAlign: 'center',
    },
    contentContainer: {
      paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
    },
    itemContainer: {
      height: 55,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: StyleGuide.spacing * 2 + 2.5,
    },
    itemTitle: {
      ...StyleGuide.typography.callout,
      color: palette.secondary,
      paddingHorizontal: StyleGuide.spacing * 2 + 5,
      flex: 1,
    },
  });
