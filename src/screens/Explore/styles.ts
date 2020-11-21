import { Dimensions, StyleSheet } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

import { TAB_BAR_HEIGHT } from '~/components/TabBar/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';

const { width } = Dimensions.get('window');

const CARD_WIDTH =
  (width - StyleGuide.spacing * 4) / 2 - StyleGuide.spacing * 0.75;

export default StyleSheet.create({
  container: {
    paddingTop: 25,
    flexGrow: 1,
    backgroundColor: StyleGuide.palette.background,
    paddingHorizontal: StyleGuide.spacing * 2,
  },

  contentContainer: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: TAB_BAR_HEIGHT + COMPACT_HEIGHT + StyleGuide.spacing * 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    height: 75,
    marginBottom: StyleGuide.spacing * 1.5,
    width: CARD_WIDTH,
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: -35,
    top: -35,
  },
  title: {
    ...StyleGuide.typography.headline,
    marginTop: 'auto',
    padding: 10,
    color: '#fff',
  },
});
