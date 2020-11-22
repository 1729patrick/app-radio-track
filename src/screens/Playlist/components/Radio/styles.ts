import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
const CARD_SIZE = 47;

export default StyleSheet.create({
  container: {
    height: 65,
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
  info: { flex: 1, paddingHorizontal: StyleGuide.spacing * 2 },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    fontSize: 16,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
});
