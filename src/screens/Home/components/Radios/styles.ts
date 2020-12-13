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
  titleContainer: { flex: 1 },
  title: {
    ...StyleGuide.typography.title1,
    color: StyleGuide.palette.primary,
    flexWrap: 'wrap',
    paddingRight: StyleGuide.spacing * 2,
  },
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing,
    marginTop: StyleGuide.spacing * 2,
  },
  showAll: {
    color: StyleGuide.palette.light,
    textTransform: 'uppercase',
    fontSize: 14,
    paddingVertical: 5,
  },
});
