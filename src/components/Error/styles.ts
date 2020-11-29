import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StyleGuide.palette.background,
    zIndex: -1,
  },
  title: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    textAlign: 'center',
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.light,
    marginTop: 5,
    textAlign: 'center',
  },
});
