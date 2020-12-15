import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { CARD_SIZE } from '~/components/Radio/Card/constants';

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 8,
  },
  button: { zIndex: 1 },
  image: {
    height: CARD_SIZE - 16,
    width: CARD_SIZE - 16,
    borderRadius: StyleGuide.borderRadius * 5,
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
  playingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playing: {
    width: 50,
    height: 50,
  },
});
