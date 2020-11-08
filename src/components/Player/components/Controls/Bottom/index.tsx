import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { SNAP_POINTS } from '../../../constants';
import { BorderlessButton } from 'react-native-gesture-handler';

type BottomControlsProps = {
  y: Animated.SharedValue<number>;
  onNextRadio: () => void;
  onPreviousRadio: () => void;
};

const BottomControls: React.FC<BottomControlsProps> = ({
  y,
  onNextRadio,
  onPreviousRadio,
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
      <BorderlessButton style={styles.button} onPress={() => onPreviousRadio()}>
        <Icon name="play-skip-back-sharp" size={30} color="#900" />
      </BorderlessButton>

      <BorderlessButton style={styles.playButton}>
        <Icon name="play" size={30} color="#900" />
        {/* <Icon name="stop" size={30} color="#900" /> */}
      </BorderlessButton>

      <BorderlessButton style={styles.button} onPress={() => onNextRadio()}>
        <Icon name="play-skip-forward" size={30} color="#900" />
      </BorderlessButton>
    </Animated.View>
  );
};

export default BottomControls;
