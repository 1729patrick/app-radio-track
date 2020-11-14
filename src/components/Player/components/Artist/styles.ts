import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    width: '80%',
    textAlign: 'center',
  },
  description: {
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
    ...StyleGuide.typography.title3,
    color: StyleGuide.palette.secondary,
  },
});
