import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  cancelAnimation,
} from 'react-native-reanimated';
import {
  State,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';
import { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

type InteractivePanGestureHandlerContextType = {
  lastAnimatedPosition: number;
};

type GestureHandlerContext = {
  startY: number;
};

const { height } = Dimensions.get('window');

export const useInteractivePanGestureHandler = (
  translateY: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void,
) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.startY;
    },

    onEnd: (event, context) => {
      const value = context.startY;
      const velocity = event.velocityY;

      if (
        velocity < 1000 &&
        ((context.startY === snapPoints[1] &&
          translateY.value < height * 0.5) ||
          context.startY === snapPoints[0])
      ) {
        if (translateY.value < height * 0.3) {
          animateToPoint(snapPoints[0]);
        } else {
          animateToPoint(snapPoints[1]);
        }

        return;
      }

      const point = value + 0.8 * velocity;

      const diffPoint = (p: number) => Math.abs(point - p);

      const deltas = snapPoints.map((p) => diffPoint(p));

      const getMinDelta = () => {
        if (value === snapPoints[0]) {
          return Math.min(deltas[0], deltas[1]);
        }

        return Math.min(deltas[0], deltas[1], deltas[2]);
      };

      const minDelta = getMinDelta();

      const val = snapPoints.reduce(
        (acc, p) => (diffPoint(p) === minDelta ? p : acc),
        0,
      );

      animateToPoint(val);
    },
  });

  return { panHandler };
};
