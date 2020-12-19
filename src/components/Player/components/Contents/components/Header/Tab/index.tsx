import { lighten } from 'polished';
import React, { memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

type TabProps = {
  indicatorWidth: number;
  translateX: Animated.SharedValue<number>;
  inputRange: number[];
  index: number;
  title: string;
  onPress: (index: number) => void;
  animation: Animated.SharedValue<number>;
};
const colorInactive = lighten(0.1, StyleGuide.palette.secondary);

const Tab: React.FC<TabProps> = ({
  indicatorWidth,
  translateX,
  inputRange,
  index,
  title,
  onPress,
  animation,
}) => {
  //@ts-ignore
  const style = useAnimatedStyle(() => {
    if (translateX.value < 0) {
      return { color: StyleGuide.palette.secondary };
    }

    const colorActive = interpolateColor(
      animation.value,
      [0, 1],
      [colorInactive, StyleGuide.palette.primary],
    );

    const color = interpolateColor(
      translateX.value,
      inputRange,
      //@ts-ignore
      inputRange.map((i: number) =>
        i === index ? colorActive : colorInactive,
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

export default memo(Tab);
