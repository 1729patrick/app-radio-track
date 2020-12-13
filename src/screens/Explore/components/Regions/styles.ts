import { lighten } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    ...StyleGuide.typography.title1,
    paddingBottom: StyleGuide.spacing * 2,
    color: StyleGuide.palette.primary,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  group: {
    width: width * 0.75,
    paddingRight: StyleGuide.spacing * 2,
  },
  button: {
    height: 50,
    borderRadius: StyleGuide.borderRadius,
    marginBottom: StyleGuide.spacing * 1.5,
    backgroundColor: lighten(0.001, StyleGuide.palette.backgroundPrimary),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: StyleGuide.spacing,
  },
  image: {
    width: 50,
    height: 50 / 1.5,
    borderRadius: StyleGuide.borderRadius,
  },
  regionTitle: {
    ...StyleGuide.typography.headline,
    paddingLeft: StyleGuide.borderRadius * 2,
    fontSize: 16,
    color: '#fff',
  },
});