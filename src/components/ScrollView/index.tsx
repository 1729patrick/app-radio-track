import React, { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useScrollPanGestureHandler from '~/hooks/useScrollPanGestureHandler';

type ScrollViewProps = {
  translateY: Animated.SharedValue<number>;
  lowerBound: number;
  snapPoints: number[];
  contentContainerStyle: object;
  animateToPoint: (point: number) => void;
};
const ScrollView: React.FC<ScrollViewProps> = ({
  translateY,
  children,
  lowerBound,
  snapPoints,
  contentContainerStyle,
  animateToPoint,
}) => {
  const upperBound = useSharedValue(0);
  const { panHandler } = useScrollPanGestureHandler(
    translateY,
    lowerBound,
    upperBound,
    animateToPoint,
    snapPoints,
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      upperBound.value = nativeEvent.layout.height + nativeEvent.layout.y;
    },
    [upperBound],
  );

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View style={[contentContainerStyle, style]} onLayout={onLayout}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ScrollView;
