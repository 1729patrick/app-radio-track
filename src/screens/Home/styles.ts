import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: StyleGuide.spacing * 2,
    height: 55,
    top: 0,
    right: 0,
    left: 0,
  },
  title: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 55,
    paddingBottom: 60,
  },
});
