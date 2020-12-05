import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    textAlign: 'center',
    alignItems: 'center',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingTop: 17,
  },
  title: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    textAlign: 'center',
    paddingBottom: 10,
  },
  description: {
    textAlign: 'center',
    ...StyleGuide.typography.title3,
    color: StyleGuide.palette.secondary,
  },
});
