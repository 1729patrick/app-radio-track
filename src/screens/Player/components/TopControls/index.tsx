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
import { RectButton } from 'react-native-gesture-handler';

interface PropTypes {
  y: Animated.SharedValue<number>;
  onCompactPlayer: () => void;
}

const TopControls = ({ y, onCompactPlayer }: PropTypes) => {
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
      <RectButton style={styles.button} onPress={onCompactPlayer}>
        <Icon name="ios-chevron-down-sharp" size={25} color="#900" />
      </RectButton>

      <RectButton style={styles.button}>
        <Icon name="heart-outline" size={25} color="#900" />
      </RectButton>
      {/* <Icon name="heart-sharp" size={22} color="#900" /> */}
    </Animated.View>
  );
};

export default TopControls;
