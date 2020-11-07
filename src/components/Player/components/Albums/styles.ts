import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    height: width,
  },
  card: {
    width: width,
    height: width,
    padding: 20,
  },
  cardImage: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#ffbb00',
  },
});
