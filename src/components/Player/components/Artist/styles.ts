import { StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    textAlign: 'center',
    alignItems: 'center',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 17,
    paddingBottom: 10,
  },
  title: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    textAlign: 'center',
    // flex: 1,
    // paddingHorizontal: StyleGuide.spacing * 1.5,
  },
  description: {
    width: '80%',
    textAlign: 'center',
    ...StyleGuide.typography.title3,
    color: StyleGuide.palette.secondary,
  },
});
