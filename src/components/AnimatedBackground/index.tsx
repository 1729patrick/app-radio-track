import React, {
  useMemo,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
  memo,
} from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

const { Value, timing } = Animated;

type OnSetColorType = {
  color: string;
  firstColor: boolean;
};

export type AnimatedBackgroundHandler = {
  setColor: (args: OnSetColorType) => void;
};

type AnimatedBackgroundProps = {
  style: object;
  children: any;
};

const AnimatedBackground: React.ForwardRefRenderFunction<
  AnimatedBackgroundHandler,
  AnimatedBackgroundProps
> = ({ children, style }, ref) => {
  const progress = useMemo(() => new Value(0), []);

  const [colors, setColors] = useState(['#fff', '#fff']);

  const onSetColor = ({ color, firstColor }: OnSetColorType) => {
    if (firstColor) {
      setColors([color, color]);
      return;
    }

    setColors([...colors, color]);
  };

  useImperativeHandle(ref, () => ({
    setColor: onSetColor,
  }));

  useEffect(() => {
    timing(progress, {
      toValue: colors.length - 1,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [colors.length, progress]);

  const backgroundColor = progress.interpolate({
    inputRange: [...new Array(colors.length)].map((_, i) => i),
    // outputRange: ['#fff', '#523f3d'],
    outputRange: colors,
  });

  return (
    <Animated.View style={[style, { backgroundColor }]}>
      {children}
    </Animated.View>
  );
};

export default memo(forwardRef(AnimatedBackground));