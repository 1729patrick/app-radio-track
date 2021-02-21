import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default (palette) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: StyleGuide.spacing * 4,
    },
    title: {
      ...StyleGuide.typography.title1,
      paddingTop: StyleGuide.spacing * 4,
      paddingBottom: StyleGuide.spacing * 2,
      paddingHorizontal: StyleGuide.spacing * 2,
      color: palette.primary,
    },
    description: {
      ...StyleGuide.typography.subhead,
      paddingHorizontal: StyleGuide.spacing * 2,
      color: palette.light,
      fontSize: 14,
      lineHeight: 18,
    },
    link: {
      color: '#5B73C2',
    },
  });
