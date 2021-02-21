import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';

export default StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  title: {
    ...StyleGuide.typography.title2,
    color: StyleGuide.palette.primary,
    marginTop: StyleGuide.spacing * 2,
  },
  description: {
    ...StyleGuide.typography.subhead,
    color: StyleGuide.palette.primary,
    marginTop: StyleGuide.spacing * 3,
  },
});
