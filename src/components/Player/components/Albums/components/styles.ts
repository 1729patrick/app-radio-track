import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    width: width,
    height: width,
    padding: 20,
  },
  cardImage: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
