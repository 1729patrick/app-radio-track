import React from 'react';
import { View, Text } from 'react-native';
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

const ArtistControls = ({ y }: PropTypes) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[1] * 0.85, SNAP_POINTS[1]],
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
        <Icon name="heart-outline" size={25} color="#900" />
        {/* <Icon name="heart-sharp" size={22} color="#900" /> */}
        <View style={[styles.playPause]}>
          <Icon name="play" size={25} color="#900" />
          {/* <Icon name="stop" size={30} color="#900" /> */}
        </View>
      </View>
    </Animated.View>
  );
};

export default ArtistControls;
