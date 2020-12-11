import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';

type GestureHandlerContext = {
  startY: number;
  currentRouteStartY: number;
  currentRouteAnimation: Animated.SharedValue<number>;
};

export const useInteractivePanGestureHandler = (
  translateY: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void,
  onStart?: () => void,
  activeTab?: Animated.SharedValue<number>,
  routesTranslateY?: Animated.SharedValue<number>[],
) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, context) => {
      context.startY = translateY.value;
      context.currentRouteStartY = 0;
      if (routesTranslateY && activeTab && activeTab.value >= 0) {
        context.currentRouteAnimation = routesTranslateY[activeTab.value];
        context.currentRouteStartY = context.currentRouteAnimation.value;
      }

      if (onStart) {
        onStart();
      }
    },
    onActive: (event, context) => {
      if (context.currentRouteAnimation) {
        if (context.currentRouteAnimation.value < 0) {
          context.currentRouteAnimation.value =
            event.translationY + context.currentRouteStartY;

          return;
        }
      }

      translateY.value = clamp(
        event.translationY + context.startY + context.currentRouteStartY,
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

      // translateY.value = withTiming(point, { mass: 10 });
      animateToPoint(point);
    },
  });

  return { panHandler };
};
