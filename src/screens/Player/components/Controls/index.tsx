import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const { height } = Dimensions.get('window');
const Controls = ({ y }) => {
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
