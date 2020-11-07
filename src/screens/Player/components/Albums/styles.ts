import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    height: width,
  },
  item: {
    width,
    padding: 20,
  },
  image: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ffbb00',
  },
});
