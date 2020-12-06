import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

const Tab = ({
  indicatorWidth,
  translateX,
  inputRange,
  index,
  title,
  onPress,
  animation,
}) => {
  const style = useAnimatedStyle(() => {
    if (translateX.value < 0) {
      return { color: StyleGuide.palette.secondary };
    }

    const colorActive = interpolateColor(
      animation.value,
      [0, 1],
      [StyleGuide.palette.secondary, StyleGuide.palette.primary],
    );

    const color = interpolateColor(
      translateX.value,
      inputRange,
      inputRange.map((i: number) =>
        i === index ? colorActive : StyleGuide.palette.secondary,
      ),
    );

    return { color };
  }, [translateX.value]);

  return (
    <TouchableWithoutFeedback
      style={[styles.container, { width: indicatorWidth }]}
      onPress={() => onPress(index)}
      key={title}>
      <Animated.Text style={[styles.title, style]}>{title}</Animated.Text>
    </TouchableWithoutFeedback>
  );
};

export default Tab;
