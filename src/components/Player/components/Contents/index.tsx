import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import { TIMING_DURATION } from '../../constants';

import styles from './styles';

import { SNAP_POINTS } from './constants';
import TabNavigator from './components/TabNavigator';
import Details from './pages/Details';
import Suggest from './pages/Suggest';

const PAGES = [
  { title: 'Detalhes', Component: Details },
  { title: 'Sugeridas', Component: Suggest },
];

const Contents = ({ translateY, compact: Compact }) => {
  const tabNavigatorRef = useRef(null);

  const initializeTabActive = () => {
    tabNavigatorRef.current?.initializeTabActive();
  };

  const onStart = () => {
    'worklet';

    runOnJS(initializeTabActive)();
  };

  const clearTabActive = () => {
    tabNavigatorRef.current?.clearTabActive();
  };

  const onEnd = () => {
    'worklet';

    if (translateY.value === SNAP_POINTS[1]) {
      runOnJS(clearTabActive)();
    }
  };

  const animateToPoint = (point: number) => {
    'worklet';

    translateY.value = withTiming(
      point,
      {
        duration: TIMING_DURATION,
        easing: Easing.out(Easing.cubic),
      },
      onEnd,
    );
  };

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    SNAP_POINTS,
    animateToPoint,
    onStart,
    onEnd,
  );

  const style = useAnimatedStyle(() => {
    const top = interpolate(
      translateY.value,
      [SNAP_POINTS[1], SNAP_POINTS[1] * 0.3],
      [0, translateY.value],
      Extrapolate.CLAMP,
    );

    return {
      marginTop: -top,
      paddingTop: top,
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const onExpandContent = () => {
    if (translateY.value === SNAP_POINTS[1]) {
      animateToPoint(SNAP_POINTS[0]);
    }
  };

  const onCompactContent = () => {
    if (translateY.value === SNAP_POINTS[0]) {
      animateToPoint(SNAP_POINTS[1]);
    }
  };

  const checkAnimated = () => {
    return !(translateY.value === SNAP_POINTS[1]);
  };

  const animation = useDerivedValue(() => {
    const progress = interpolate(
      translateY.value,
      [SNAP_POINTS[1], SNAP_POINTS[1] * 0.6],
      [0, 1],
    );

    return progress;
  }, [translateY.value]);

  return (
    <Animated.View style={styles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[style]}>
          <Compact
            contentY={translateY}
            rippleColor="transparent"
            onPress={onCompactContent}
          />

          <Animated.View style={[styles.content]}>
            <TouchableWithoutFeedback onPress={onExpandContent}>
              <View style={styles.indicator} />
            </TouchableWithoutFeedback>

            <TabNavigator
              onPress={onExpandContent}
              pages={PAGES}
              checkAnimated={checkAnimated}
              animation={animation}
              ref={tabNavigatorRef}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Contents;
