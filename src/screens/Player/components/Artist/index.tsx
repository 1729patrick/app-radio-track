import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SNAP_POINTS } from '../../constants';
import styles from './styles';

interface PropTypes {
  y: Animated.SharedValue<number>;
}

const Artist = ({ y }: PropTypes) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[0], SNAP_POINTS[1] * 0.2],
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
