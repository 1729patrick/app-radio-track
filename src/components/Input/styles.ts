import { lighten } from 'polished';
import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    ...StyleGuide.typography.caption,
    marginTop: StyleGuide.spacing * 5,
    backgroundColor: lighten(0.1, StyleGuide.palette.backgroundPrimary),
    paddingLeft: StyleGuide.spacing * 1.5,
    borderRadius: StyleGuide.borderRadius * 2,
  },
});
