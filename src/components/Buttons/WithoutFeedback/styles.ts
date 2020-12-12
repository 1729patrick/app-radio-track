import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  title: {
    ...StyleGuide.typography.headline,
    fontSize: 13,
    letterSpacing: 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: StyleGuide.palette.light,
    marginVertical: StyleGuide.spacing * 4,
  },
});
