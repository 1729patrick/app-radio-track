import React, {
  useMemo,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
} from 'react';
import { Animated, View, Easing } from 'react-native';
import usePrevious from '~/hooks/usePrevious';

const { Value, timing, sequence } = Animated;

const AnimatedBackground = ({ children, style }, ref) => {
  const progress = useMemo(() => new Value(0), []);

  const [color, setColor] = useState('#fff');
  const prevColor = usePrevious<string>(color);

  useImperativeHandle(ref, () => ({
    setColor,
  }));

  useEffect(() => {
    progress.setValue(0);

    timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, color]);

  console.log([prevColor, color]);
  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColor, color],
  });

  return (
    <Animated.View style={[style, { backgroundColor }]}>
      {children}
    </Animated.View>
  );
};

export default forwardRef(AnimatedBackground);
