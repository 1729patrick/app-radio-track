import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  player: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width,
    height,
  },
});