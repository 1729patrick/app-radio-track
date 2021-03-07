import { StyleSheet } from 'react-native';
import StyleGuide, { palette } from '~/utils/StyleGuide';

import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    container: {
      marginBottom: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: StyleGuide.spacing * 2,
    },
    titleContainer: { flex: 1 },
    title: {
      ...StyleGuide.typography.title1,
      color: palette.primary,
      flexWrap: 'wrap',
      paddingRight: StyleGuide.spacing * 2,
    },
    description: {
      ...StyleGuide.typography.subhead,
      color: palette.secondary,
    },
    contentContainer: {
      paddingHorizontal: StyleGuide.spacing - 1,
      marginTop: StyleGuide.spacing * 2,
    },
    showAll: {
      color: palette.light,
      textTransform: 'uppercase',
      fontSize: 14,
      paddingVertical: 5,
    },
  });
