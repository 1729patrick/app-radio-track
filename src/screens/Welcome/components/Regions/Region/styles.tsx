import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: StyleGuide.spacing * 2,
    alignItems: 'center',
  },
  image: { width: 50, height: 50 / 1.5, borderRadius: StyleGuide.borderRadius },
  title: {
    ...StyleGuide.typography.headline,
    paddingLeft: StyleGuide.borderRadius * 3,
    fontSize: 16,
    color: '#fff',
  },
});
