import { StyleSheet } from 'react-native';
import { CARD_SIZE } from './constants';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    paddingLeft: 15,
  },
  contentContainer: { paddingHorizontal: 5, marginTop: 10 },
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 10,
  },
  cardImage: {
    height: CARD_SIZE - 20,
    width: CARD_SIZE - 20,
    borderRadius: 4,
    backgroundColor: '#ffbb00',
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 19,
  },
  cardDescription: {},
});
