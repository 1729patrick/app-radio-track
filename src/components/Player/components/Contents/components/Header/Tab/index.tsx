import { lighten } from 'polished';
import React, { memo, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

import getStyles from './styles';

type TabProps = {
  indicatorWidth: number;
  translateX: Animated.SharedValue<number>;
  inputRange: number[];
  index: number;
  title: string;
  onPress: (index: number) => void;
  animation: Animated.SharedValue<number>;
};

const Tab: React.FC<TabProps> = ({
  indicatorWidth,
  translateX,
  inputRange,
  index,
  title,
  onPress,
  animation,
}) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);
  const colorInactive = useMemo(() => lighten(0.1, palette.secondary), [
    palette.secondary,
  ]);

  //@ts-ignore
  const style = useAnimatedStyle(() => {
    if (translateX.value < 0) {
      return { color: palette.secondary };
    }

    const colorActive = interpolateColor(
      animation.value,
      [0, 1],
      [colorInactive, palette.app],
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
  }, [translateX]);

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
