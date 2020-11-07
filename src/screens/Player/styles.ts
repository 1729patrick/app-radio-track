import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#999',
    ...StyleSheet.absoluteFillObject,
  },
  player: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width,
    height,
  },
});
