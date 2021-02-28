import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { MEDIA_WIDTH } from './constants';

const { width } = Dimensions.get('window');

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      width,
    },
    content: {
      width: '100%',
      paddingHorizontal: StyleGuide.spacing * 2,
      paddingVertical: StyleGuide.spacing,
    },
    info: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 47,
      height: 47,
      borderRadius: StyleGuide.borderRadius * 2.5,
    },
    components: {
      flex: 1,
      paddingLeft: StyleGuide.spacing * 2,
      paddingRight: StyleGuide.spacing,
      justifyContent: 'center',
    },
    headLine: {
      ...StyleGuide.typography.title2,
      fontSize: 13,
      color: palette.primary,
    },
    tagLine: {
      ...StyleGuide.typography.subhead,
      fontSize: 10,
      color: palette.primary,
    },
    advertiser: {
      fontSize: 10,
      color: palette.secondary,
    },
    starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starRating: {
      width: 65,
      marginTop: StyleGuide.spacing,
    },
    store: {
      ...StyleGuide.typography.subhead,
      fontSize: 11,
      marginLeft: StyleGuide.spacing,
    },
    callToActionButton: {
      paddingHorizontal: StyleGuide.spacing * 1.5,
      paddingVertical: StyleGuide.spacing * 1,
      backgroundColor: palette.app,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: StyleGuide.borderRadius * 1.5,
      marginRight: -StyleGuide.spacing,
    },
    callToActionText: {
      ...StyleGuide.typography.headline,
      color: palette.primary,
      fontSize: 12,
      letterSpacing: 0.7,
      paddingBottom: 1,
      flexWrap: 'wrap',
      textAlign: 'center',
    },
    media: {
      marginTop: StyleGuide.spacing * 2,
      width: MEDIA_WIDTH,
      borderRadius: StyleGuide.borderRadius * 30,
      overflow: 'hidden',
    },
  });
