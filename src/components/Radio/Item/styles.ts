import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { IMAGE_SIZE, ITEM_HEIGHT } from './constants';

export default StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    paddingHorizontal: StyleGuide.spacing * 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: StyleGuide.borderRadius * 2.5,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  info: { flex: 1, paddingHorizontal: StyleGuide.spacing * 2 },
  title: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.primary,
    fontSize: 15.5,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.secondary,
  },
  playing: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
  },
});
