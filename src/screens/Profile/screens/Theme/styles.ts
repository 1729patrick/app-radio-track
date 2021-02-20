import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  theme: {
    flexDirection: 'row',
    paddingVertical: StyleGuide.spacing * 2,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  title: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.primary,
    marginLeft: StyleGuide.spacing * 1.5,
  },
});
