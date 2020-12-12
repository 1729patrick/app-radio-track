import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import { clamp, snapPoint } from 'react-native-redash';
import { SNAP_POINTS } from '../constants';

type GestureHandlerContext = {
  startY: number;
};

const useScrollPanGestureHandler = ({
  translateY,
  lowerBound,
  contentY,
  animateToPoint,
}) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >(
    {
      onStart: (_, context) => {
        cancelAnimation(translateY);
        context.startY = translateY.value;
      },
      onActive: (event, context) => {
        const y = event.translationY + context.startY;
        translateY.value = clamp(y, lowerBound.value, 0);

        if (y > 0) {
          contentY.value = y + SNAP_POINTS[0];
        }
      },

      onEnd: (event, context) => {
        const { velocityY } = event;

        translateY.value = withDecay({
          velocity: velocityY,
          deceleration: 0.997,
          clamp: [lowerBound.value, 0],
        });

        const y = event.translationY + context.startY;

        if (y > 0) {
          const point = snapPoint(y, velocityY, SNAP_POINTS);
          animateToPoint(point);
        }
      },
    },
    [],
  );

  return { panHandler };
};

export default useScrollPanGestureHandler;
