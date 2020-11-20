import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
const CARD_SIZE = 20;

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 8,
  },
  button: { zIndex: 1 },
  cardImage: {
    height: CARD_SIZE - 16,
    width: CARD_SIZE - 16,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  cardTitle: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    marginTop: 10,
  },
  cardDescription: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
});
