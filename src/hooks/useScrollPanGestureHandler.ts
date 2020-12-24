import { Dimensions } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import { clamp, snapPoint } from 'react-native-redash';

type GestureHandlerContext = {
  startY: number;
  upperBound: number;
};

const { height } = Dimensions.get('window');

const useScrollPanGestureHandler = (
  translateY,
  lowerBound,
  upperBound,
  animateToPoint,
  snapPoints,
) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >(
    {
      onStart: (_, context) => {
        cancelAnimation(translateY);
        context.startY = translateY.value;
        context.upperBound = height - upperBound.value;
      },
      onActive: (event, context) => {
        console.log({ y: translateY.value });

        const y = event.translationY + context.startY;
        if (y > context.upperBound) {
          translateY.value = y;
        }
      },

      onEnd: (event, context) => {
        const { velocityY } = event;

        if (
          translateY.value > context.upperBound &&
          translateY.value < lowerBound
        ) {
          translateY.value = withDecay({
            velocity: velocityY,
            deceleration: 0.997,
            clamp: [context.upperBound, lowerBound],
          });
        } else if (translateY.value > lowerBound) {
          const value = context.startY;
          const velocity = event.velocityY;

          const validSnapPoints =
            value === snapPoints[0]
              ? [snapPoints[0], snapPoints[1]]
              : snapPoints;

          const point = snapPoint(translateY.value, velocity, validSnapPoints);

          animateToPoint(point);
        }
      },
    },
    [],
  );

  return { panHandler };
};

export default useScrollPanGestureHandler;
