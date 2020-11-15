import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.background,
    zIndex: 2,
  },
  header: {
    paddingTop: 25,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  input: {
    flex: 1,
    paddingLeft: StyleGuide.spacing * 3,
  },
  contentContainer: {},
  itemContainer: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  itemTitle: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.secondary,
    paddingLeft: StyleGuide.spacing * 3,
    flex: 1,
  },
});
