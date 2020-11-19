import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    marginBottom: 55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  title: {
    ...StyleGuide.typography.title1,
    color: StyleGuide.palette.primary,
  },
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
    marginTop: 15,
  },
});
