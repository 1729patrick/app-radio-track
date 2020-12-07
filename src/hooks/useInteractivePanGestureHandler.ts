import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';

type InteractivePanGestureHandlerContextType = {
  lastAnimatedPosition: number;
};

type GestureHandlerContext = {
  startY: number;
};

export const useInteractivePanGestureHandler = (
  translateY: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void,
  onStart?: () => void,
  onEnd?: () => void,
) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, context) => {
      context.startY = translateY.value;

      if (onStart) {
        onStart();
      }
    },
    onActive: (event, context) => {
      translateY.value = clamp(
        event.translationY + context.startY,
        snapPoints[0],
        snapPoints[snapPoints.length - 1],
      );
    },

    onEnd: (event, context) => {
      const value = context.startY;
      const velocity = event.velocityY;

      const validSnapPoints =
        value === snapPoints[0] ? [snapPoints[0], snapPoints[1]] : snapPoints;

      const point = snapPoint(translateY.value, velocity, validSnapPoints);

      if (onEnd) {
        onEnd();
      }
      animateToPoint(point);
    },
  });

  return { panHandler };
};
