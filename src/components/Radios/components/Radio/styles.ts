import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { CARD_SIZE } from '../../constants';

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 8,
  },
  button: { zIndex: 1 },
  image: {
    height: CARD_SIZE - 16,
    width: CARD_SIZE - 16,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    marginTop: 10,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
});
