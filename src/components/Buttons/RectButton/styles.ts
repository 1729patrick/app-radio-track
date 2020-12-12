import { lighten } from 'polished';
import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 4,
    marginTop: StyleGuide.spacing * 5,
    backgroundColor: lighten(0.1, StyleGuide.palette.backgroundPrimary),
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...StyleGuide.typography.headline,
    fontSize: 15,
    letterSpacing: 0.7,
  },
});
