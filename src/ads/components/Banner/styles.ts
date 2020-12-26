import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { MEDIA_WIDTH } from './constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    backgroundColor: StyleGuide.palette.backgroundSecondary,
    paddingHorizontal: StyleGuide.spacing,
  },
  content: {
    width: '100%',
  },
  info: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 55,
    height: 55,
  },
  components: {
    flex: 1,
    paddingHorizontal: StyleGuide.spacing,
  },
  headLine: {
    ...StyleGuide.typography.title2,
    fontSize: 13,
  },
  tagLine: {
    ...StyleGuide.typography.subhead,
    fontSize: 10,
  },
  advertiser: {
    fontSize: 10,
    color: StyleGuide.palette.secondary,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRating: {
    width: 65,
    marginTop: StyleGuide.spacing,
  },
  store: {
    ...StyleGuide.typography.subhead,
    fontSize: 11,
    marginLeft: StyleGuide.spacing,
  },
  callToActionButton: {
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.app,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: StyleGuide.borderRadius * 2,
    elevation: 10,
  },
  callToActionText: {
    ...StyleGuide.typography.headline,
    color: StyleGuide.palette.primary,
    fontSize: 11,
    letterSpacing: 0.7,
    paddingBottom: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  media: {
    width: MEDIA_WIDTH,
    marginHorizontal: StyleGuide.spacing,
    backgroundColor: StyleGuide.palette.backgroundSecondary,
  },
});
