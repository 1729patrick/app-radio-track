import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  contentContainer: {
    paddingBottom: StyleGuide.spacing * 4,
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingTop: StyleGuide.spacing * 4,
    paddingBottom: StyleGuide.spacing * 2,
    paddingHorizontal: StyleGuide.spacing * 2,
    color: StyleGuide.palette.primary,
  },
  description: {
    ...StyleGuide.typography.subhead,
    paddingHorizontal: StyleGuide.spacing * 2,
    color: StyleGuide.palette.light,
    fontSize: 14,
  },
  programmingContainer: {
    width,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  programmingContent: {
    backgroundColor: '#43434C',
    borderRadius: StyleGuide.borderRadius,
    padding: StyleGuide.spacing * 2,
  },
  programmingDayTitle: {
    paddingTop: StyleGuide.spacing,
    paddingHorizontal: 0,
    paddingBottom: StyleGuide.spacing * 3,
  },
  programming: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingBottom: 6,
  },
  programmingTitle: {
    ...StyleGuide.typography.subhead,
    fontSize: 14,
  },
  programmingName: {
    flex: 1,
    paddingRight: StyleGuide.spacing * 2,
  },
  link: {
    color: '#5B73C2',
  },
});
