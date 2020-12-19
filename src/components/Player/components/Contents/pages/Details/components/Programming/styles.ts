import { lighten } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');

export const CARD_PADDING = StyleGuide.spacing * 2;

export default StyleSheet.create({
  container: {
    width,
    paddingHorizontal: CARD_PADDING,
    paddingBottom: 30,
  },
  content: {
    backgroundColor: lighten(0.14, StyleGuide.palette.backgroundPrimary),
    borderRadius: StyleGuide.borderRadius * 2.5,
    padding: CARD_PADDING,
    paddingBottom: 30,
    height: 200,
    overflow: 'hidden',
  },
  wrapper: {
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    ...StyleGuide.typography.title1,
    paddingTop: StyleGuide.spacing,
    paddingBottom: StyleGuide.spacing * 3,
  },
  dayTitle: {
    ...StyleGuide.typography.subhead,
    paddingBottom: StyleGuide.spacing,
    fontSize: 14,
  },
  programming: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  programmingTitle: {
    ...StyleGuide.typography.subhead,
    fontSize: 14,
  },
  nameTitle: {
    flex: 1,
    paddingRight: StyleGuide.spacing * 2,
  },
  showMoreContainer: {
    width,
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreTitle: {
    backgroundColor: lighten(0.14, StyleGuide.palette.backgroundPrimary),
    borderWidth: 1,
    borderColor: StyleGuide.palette.secondary,
    paddingHorizontal: StyleGuide.spacing * 2,
    paddingVertical: StyleGuide.spacing,
    borderRadius: 100,
  },
});
