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

const usePrevious = <T>(value: T): T | undefined => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

type InteractivePanGestureHandlerContextType = {
  lastAnimatedPosition: number;
};

export const useInteractivePanGestureHandler = (
  animatedPosition: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void,
  offset?: Animated.SharedValue<number>,
): [
  (event: PanGestureHandlerGestureEvent) => void,
  Animated.SharedValue<State>,
  Animated.SharedValue<number>,
  Animated.SharedValue<number>,
] => {
  const gestureState = useSharedValue<State>(State.UNDETERMINED);
  const gestureTranslationY = useSharedValue(0);
  const gestureVelocityY = useSharedValue(0);

  const oldSnapPoints = usePrevious(snapPoints);
  console.log(`snapPoints === oldSnapPoints? ${snapPoints === oldSnapPoints}`);

  console.log(
    `[useInteractivePanGestureHandler] snapPoints: ${JSON.stringify(
      snapPoints,
    )}`,
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    InteractivePanGestureHandlerContextType
  >(
    {
      onStart: ({ state, translationY, velocityY }, context) => {
        // cancel current animation
        cancelAnimation(animatedPosition);

        // store current animated position
        context.lastAnimatedPosition = animatedPosition.value;

        // set variables
        gestureState.value = state;
        gestureTranslationY.value = translationY;
        gestureVelocityY.value = velocityY;
      },
      onActive: ({ state, translationY, velocityY }, context) => {
        gestureState.value = state;
        gestureTranslationY.value = translationY;
        gestureVelocityY.value = velocityY;

        animatedPosition.value = clamp(
          context.lastAnimatedPosition +
            translationY +
            (offset && context.lastAnimatedPosition === 0 ? offset.value : 0) *
              -1,
          snapPoints[snapPoints.length - 1],
          snapPoints[0],
        );
        console.log(
          `onActive: snapPoints: ${JSON.stringify(
            snapPoints,
          )}, context: ${JSON.stringify(
            context,
          )}, translationY: ${translationY}, animatedPosition: ${
            animatedPosition.value
          }`,
        );
      },
      onEnd: ({ state }, context) => {
        gestureState.value = state;
        if (
          (offset ? offset.value : 0) > 0 &&
          context.lastAnimatedPosition === 0 &&
          animatedPosition.value === 0
        ) {
          return;
        }
        animateToPoint(
          snapPoint(
            gestureTranslationY.value + context.lastAnimatedPosition,
            gestureVelocityY.value,
            snapPoints,
          ),
        );
      },
    },
    [snapPoints, animateToPoint],
  );

  const oldGestureHandler = usePrevious(gestureHandler);
  console.log(
    `gestureHandler === oldGestureHandler? ${
      gestureHandler === oldGestureHandler
    }`,
  );

  return [gestureHandler, gestureState, gestureTranslationY, gestureVelocityY];
};
