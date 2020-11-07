import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const { height } = Dimensions.get('window');
const Artist = ({ y }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [(height - 70) * 0.85, height - 70],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.info}>
        <Text style={[styles.title]}>Rádio XXX</Text>
        <Text style={[styles.description]}>São Miguel do Oeste</Text>
      </View>

      <View style={styles.controls}>
        <View style={[styles.playPause]}>
          <Icon name="play" size={22} color="#900" />
          {/* <Icon name="stop" size={30} color="#900" /> */}
        </View>
        <Icon name="play-skip-forward" size={22} color="#900" />
      </View>
    </Animated.View>
  );
};

export default Artist;
