import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { CARD_PADDING } from '../../constants';

const { width } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';
import { lighten } from 'polished';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      width,
      paddingHorizontal: CARD_PADDING,
      paddingBottom: 30,
    },
    content: {
      backgroundColor: lighten(0.05, palette.backgroundPrimary),
      borderRadius: StyleGuide.borderRadius * 2.5,
      padding: CARD_PADDING,
      paddingBottom: 30,
      height: 200,
      overflow: 'hidden',
    },
    wrapper: {
      height: '100%',
      overflow: 'hidden',
    },
    title: {
      ...StyleGuide.typography.title1,
      paddingTop: StyleGuide.spacing,
      paddingBottom: StyleGuide.spacing * 3,
      color: palette.primary,
    },
    dayTitle: {
      ...StyleGuide.typography.subhead,
      paddingBottom: StyleGuide.spacing,
      fontSize: 14,
      color: palette.primary,
    },
    programming: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 12,
    },
    programmingTitle: {
      ...StyleGuide.typography.subhead,
      fontSize: 14,
    },
    nameTitle: {
      flex: 1,
      paddingRight: StyleGuide.spacing * 2,
    },
    showMoreContainer: {
      width,
      position: 'absolute',
      right: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    showMoreButton: {
      backgroundColor: lighten(0.05, palette.backgroundPrimary),
      borderWidth: 1,
      borderColor: palette.secondary,
      paddingHorizontal: StyleGuide.spacing * 2,
      paddingVertical: StyleGuide.spacing,
      borderRadius: 100,
      color: palette.primary,
    },
    showMoreTitle: { color: palette.primary },
  });
