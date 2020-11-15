import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { CARD_SIZE } from '../../constants';

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 10,
  },
  cardImage: {
    height: CARD_SIZE - 20,
    width: CARD_SIZE - 20,
    borderRadius: 4,
    backgroundColor: '#232323',
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
