import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { SNAP_POINTS } from '~/screens/Player/constants';

interface PropTypes {
  y: Animated.SharedValue<number>;
}

const Controls = ({ y }: PropTypes) => {
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
    <Animated.View style={[styles.container, style]}>
      <Icon name="play-skip-back-sharp" size={30} color="#900" />

      <View style={[styles.playPause]}>
        <Icon name="play" size={30} color="#900" />
        {/* <Icon name="stop" size={30} color="#900" /> */}
      </View>
      <Icon name="play-skip-forward" size={30} color="#900" />
    </Animated.View>
  );
};

export default Controls;
