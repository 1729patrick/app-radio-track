import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './styles';

const { height } = Dimensions.get('window');
const Artist = ({ y }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [0, (height - 70) * 0.2],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View>
      <Animated.View style={[styles.container, style]}>
        <Text style={[styles.title]}>Rádio XXX</Text>
        <Text style={[styles.description]}>São Miguel do Oeste</Text>
      </Animated.View>
    </View>
  );
};

export default Artist;
