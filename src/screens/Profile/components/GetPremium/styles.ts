import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  title: {
    ...StyleGuide.typography.title1,
    textAlign: 'center',
    paddingHorizontal: StyleGuide.spacing * 3,
    marginTop: StyleGuide.spacing * 6,
  },
  advantageCard: {
    marginTop: StyleGuide.spacing * 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  advantages: {
    marginTop: StyleGuide.spacing * 3,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  advantageTitle: {
    ...StyleGuide.typography.callout,
    color: StyleGuide.palette.primary,
    marginLeft: StyleGuide.spacing * 1.5,
  },
  containerBottom: {
    marginTop: StyleGuide.spacing * 4,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  line: {
    backgroundColor: StyleGuide.palette.backgroundSecondary,
    width: '100%',
    height: 1,
    marginTop: StyleGuide.spacing * 2,
  },
});
