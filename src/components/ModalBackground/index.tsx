import React, { memo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import styles from './styles';

type ModalBackgroundProps = {
  translateY: Animated.SharedValue<number>;
  snapPoints: number[];
  onPress: () => void;
};

const ModalBackground = ({
  translateY,
  snapPoints,
  onPress,
}: ModalBackgroundProps) => {
  const opacity = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      snapPoints,
      [0.75, 0],
      Extrapolate.CLAMP,
    );
  }, [translateY.value, snapPoints]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value]);

  const animatedProps = useAnimatedProps(() => {
    const pointerEvents = opacity.value === 0.75 ? 'auto' : 'none';

    return {
      pointerEvents,
    };
  }, [translateY.value, snapPoints[0]]);

  return (
    <Animated.View
      style={[styles.container, style]}
      onStartShouldSetResponder={onPress}
      animatedProps={animatedProps}
    />
  );
};

export default memo(ModalBackground);
