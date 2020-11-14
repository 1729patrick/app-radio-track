import React from 'react';
import { Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import { SNAP_POINTS } from '../../../constants';
import { BorderlessButton } from 'react-native-gesture-handler';

type TopControlsProps = {
  y: Animated.SharedValue<number>;
  onCompactPlayer: () => void;
  title?: string;
};

const TopControls: React.FC<TopControlsProps> = ({
  y,
  onCompactPlayer,
  title,
}) => {
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
      <BorderlessButton
        rippleColor="#fff"
        style={styles.button}
        onPress={onCompactPlayer}>
        <Icon name="ios-chevron-down-sharp" size={25} color="#fff" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      <BorderlessButton rippleColor="#fff" style={styles.button}>
        <Icon name="heart-outline" size={25} color="#fff" />
      </BorderlessButton>
      {/* <Icon name="heart-sharp" size={22} color="#fff" /> */}
    </Animated.View>
  );
};

export default TopControls;
