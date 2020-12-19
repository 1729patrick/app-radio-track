import { Dimensions, StyleSheet } from 'react-native';
import { CARD_SIZE } from '~/components/Radio/Card/constants';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    marginBottom: 55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: StyleGuide.spacing * 2,
  },
  titleContainer: { flex: 1 },
  title: {
    ...StyleGuide.typography.headline,
    fontSize: 18.5,
    color: StyleGuide.palette.primary,
    flexWrap: 'wrap',
    paddingRight: StyleGuide.spacing * 2,
  },
  contentContainer: {
    paddingHorizontal: StyleGuide.spacing * 1.5,
    marginTop: StyleGuide.spacing * 2,
  },
  showAll: {
    color: StyleGuide.palette.light,
    textTransform: 'uppercase',
    fontSize: 14,
    paddingVertical: 5,
  },
});
