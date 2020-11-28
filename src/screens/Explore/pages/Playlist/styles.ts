import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: HEADER_HEIGHT,
    paddingBottom: 60,
  },
});
