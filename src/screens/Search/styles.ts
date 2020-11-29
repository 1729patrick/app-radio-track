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
    ...StyleGuide.typography.caption,
    flex: 1,
    paddingLeft: StyleGuide.spacing * 2,
    color: StyleGuide.palette.primary,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundTitle: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    textAlign: 'center',
  },
  notFoundDescription: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.light,
    marginTop: 5,
    textAlign: 'center',
  },
  contentContainer: {},
  itemContainer: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: StyleGuide.spacing * 2 + 2.5,
  },
  itemTitle: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.secondary,
    paddingHorizontal: StyleGuide.spacing * 2 + 5,
    flex: 1,
  },
});
