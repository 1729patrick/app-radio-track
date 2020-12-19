import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { CARD_SIZE } from '~/components/Radio/Card/constants';

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: StyleGuide.spacing,
  },
  button: { zIndex: 1 },

  image: {
    height: CARD_SIZE - StyleGuide.spacing * 2,
    width: CARD_SIZE - StyleGuide.spacing * 2,
    borderRadius: StyleGuide.borderRadius * 4,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  title: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.primary,
    marginTop: 10,
    fontSize: 13.5,
    paddingRight: StyleGuide.spacing * 1.5,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
    fontSize: 13.5,
    paddingRight: StyleGuide.spacing * 1.5,
  },
  playingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: StyleGuide.borderRadius * 4,
  },
  playing: {
    width: 50,
    height: 50,
  },
});
