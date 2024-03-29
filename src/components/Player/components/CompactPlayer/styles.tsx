import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { COMPACT_HEIGHT } from '../../constants';

const { width } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      top: 0,
      left: 0,
      position: 'absolute',
      height: COMPACT_HEIGHT,
      width: '100%',
      zIndex: 1,
    },
    compactButton: {
      flex: 1,
      paddingLeft: COMPACT_HEIGHT * 1.2,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    info: {
      justifyContent: 'center',
      flex: 1,
      paddingRight: StyleGuide.spacing,
      paddingBottom: 2,
    },
    title: {
      ...StyleGuide.typography.headline,
      color: palette.primary,
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.secondary,
    },
    controls: { flexDirection: 'row', alignItems: 'center' },
    buttonContainer: {
      height: COMPACT_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: StyleGuide.spacing,
    },
    button: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: StyleGuide.spacing,
    },
    playButton: {},
    stopButton: {},
    loader: {
      position: 'absolute',
      height: 90,
      width: 90,
    },
    background: {
      backgroundColor: palette.backgroundPrimary,
      position: 'absolute',
      width: width,
      height: COMPACT_HEIGHT,
      top: 0,
    },
  });
