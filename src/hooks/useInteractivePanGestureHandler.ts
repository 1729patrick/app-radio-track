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
  lowerBound: number;
};

export const useInteractivePanGestureHandler = (
  translateY: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void,
  onStart?: () => void,
  activeTab?: Animated.SharedValue<number>,
  routesTranslateY?: Animated.SharedValue<number>[],
  routesLowerBound?: Animated.SharedValue<number>[],
) => {
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, context) => {
      context.startY = translateY.value;
      context.currentRouteStartY = 0;

      if (
        routesTranslateY &&
        routesLowerBound &&
        activeTab &&
        activeTab.value >= 0
      ) {
        context.currentRouteAnimation = routesTranslateY[activeTab.value];
        context.currentRouteStartY = context.currentRouteAnimation.value;
        context.lowerBound = routesLowerBound[activeTab.value].value;
      }

      if (onStart) {
        onStart();
      }
    },
    onActive: (event, context) => {
      if (context.currentRouteAnimation) {
        if (context.currentRouteAnimation.value < 0) {
          context.currentRouteAnimation.value = clamp(
            event.translationY + context.currentRouteStartY,
            context.lowerBound,
            0,
          );

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

      animateToPoint(point);
    },
  });

  return { panHandler };
};
