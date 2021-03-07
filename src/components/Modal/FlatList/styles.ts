import { Dimensions, StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';

export const headerHeight = HEADER_HEIGHT + STATUS_BAR_HEIGHT;
const { height } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    fakeBackground: {},
    contentContainer: {
      backgroundColor: palette.backgroundSecondary,
      height: height + 10,
    },
    header: {
      backgroundColor: palette.backgroundSecondary,
      borderTopRightRadius: StyleGuide.borderRadius * 3,
      borderTopLeftRadius: StyleGuide.borderRadius * 3,
      width: '100%',
    },
    headerContent: {
      flexDirection: 'row',
      height: HEADER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    titleButtonOK: {
      color: palette.app,
      textTransform: 'uppercase',
    },
    title: {
      ...StyleGuide.typography.headline,
      color: palette.primary,
    },
  });
