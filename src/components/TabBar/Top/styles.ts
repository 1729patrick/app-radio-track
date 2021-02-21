import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

import { TOP_TAB_BAR_HEIGHT } from './constants';

export default (palette) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
      backgroundColor: palette.backgroundPrimary,
      height: TOP_TAB_BAR_HEIGHT,
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
      elevation: 5,
    },
    indicator: {
      backgroundColor: palette.app,
      height: 2,
      position: 'absolute',
      bottom: 0,
    },
  });
