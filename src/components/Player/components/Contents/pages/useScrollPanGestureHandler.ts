import { Dimensions } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import { clamp, snapPoint } from 'react-native-redash';
import { HEADER_HEIGHT } from '../components/Header/constants';
import { SNAP_POINTS } from '../constants';

type GestureHandlerContext = {
  startY: number;
  lowerBound: number;
};

const { height } = Dimensions.get('window');

const useScrollPanGestureHandler = ({
  translateY,
  contentHeight,
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
        context.lowerBound = -(
          contentHeight.value -
          (height - SNAP_POINTS[0] - HEADER_HEIGHT)
        );
      },
      onActive: (event, context) => {
        const y = event.translationY + context.startY;
        translateY.value = clamp(y, context.lowerBound, 0);

        if (y > 0) {
          contentY.value = y + SNAP_POINTS[0];
        }
      },

      onEnd: (event, context) => {
        const { velocityY } = event;

        translateY.value = withDecay({
          velocity: velocityY,
          deceleration: 0.997,
          clamp: [context.lowerBound, 0],
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
