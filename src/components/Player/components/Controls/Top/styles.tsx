import { StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';
import { CONTROLS_TOP_HEIGHT } from './constants';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      top: 0,
      paddingTop: STATUS_BAR_HEIGHT,
      left: 0,
      position: 'absolute',
      height: CONTROLS_TOP_HEIGHT,
      width: '100%',
      zIndex: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      backgroundColor: palette.backgroundPrimary,
    },
    button: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...StyleGuide.typography.headline,
      color: palette.primary,
      paddingHorizontal: StyleGuide.spacing * 2,
      flex: 1,
      textAlign: 'center',
    },
  });
