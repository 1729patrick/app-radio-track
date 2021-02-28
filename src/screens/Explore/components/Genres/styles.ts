import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

const CARD_WIDTH =
  (width - StyleGuide.spacing * 4) / 2 - StyleGuide.spacing * 0.75;

const CARD_HEIGHT = 75;
import { PalleteType } from '~/contexts/ThemeContext';

export default (palette: PalleteType) =>
  StyleSheet.create({
    title: {
      ...StyleGuide.typography.title1,
      paddingBottom: StyleGuide.spacing * 2,
      color: palette.primary,
      marginTop: StyleGuide.spacing * 3,
      width: '100%',
    },
    regionTitle: { marginTop: 0, paddingHorizontal: StyleGuide.spacing * 2 },
    genres: {
      paddingHorizontal: StyleGuide.spacing * 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      height: CARD_HEIGHT,
      marginBottom: StyleGuide.spacing * 1.5,
      width: CARD_WIDTH,
      borderRadius: StyleGuide.borderRadius * 2.5,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.border,
    },
    button: {
      width: '100%',
      height: '100%',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      position: 'absolute',
    },
    genreTitle: {
      ...StyleGuide.typography.headline,
      fontSize: 16,
      marginTop: 'auto',
      padding: 10,
      color: '#fff',
      paddingRight: 20,
    },
  });
