import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    height: width,
    zIndex: 1,
  },
});
