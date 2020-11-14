import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    height: width,
  },
  loader: {
    width: width - 40,
    height: width - 40,
    backgroundColor: '#fff',
    padding: 20,
    left: 20,
    top: 20,
    borderRadius: 6,
    position: 'absolute',
  },
});
