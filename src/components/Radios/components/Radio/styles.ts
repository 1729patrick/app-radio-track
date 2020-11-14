import { StyleSheet } from 'react-native';
import { CARD_SIZE } from '../../constants';

export default StyleSheet.create({
  card: {
    width: CARD_SIZE,
    paddingHorizontal: 10,
  },
  cardImage: {
    height: CARD_SIZE - 20,
    width: CARD_SIZE - 20,
    borderRadius: 4,
    backgroundColor: '#232323',
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 19,
    color: '#fff',
  },
  cardDescription: {
    color: '#fff',
  },
});
