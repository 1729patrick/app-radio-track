import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
const CARD_SIZE = 37;

export default StyleSheet.create({
  container: {
    height: 55,
    paddingHorizontal: StyleGuide.spacing * 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: CARD_SIZE,
    width: CARD_SIZE,
    borderRadius: 4,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    fontSize: 16,
    flex: 1,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
});
