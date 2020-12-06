import React from 'react';
import { Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import { TIMING_DURATION } from '../../constants';

import styles from './styles';

import { SNAP_POINTS } from './constants';

const Contents = ({ translateY, compact: Compact }) => {
  const animateToPoint = (point: number) => {
    'worklet';

    translateY.value = withTiming(point, {
      duration: TIMING_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  };

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    SNAP_POINTS,
    animateToPoint,
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

  return (
    <Animated.View style={styles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[style]}>
          <Compact contentY={translateY} rippleColor="transparent" />

          <Animated.View style={[styles.content]}>
            <View style={styles.indicator} />

            <View style={styles.header}>
              {/* <Text style={styles.tab}>Comentários</Text> */}
              <Text style={styles.tab}>Detalhes</Text>
              <Text style={styles.tab}>Relacionadas</Text>

              <View style={styles.tabIndicator} />
            </View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Contents;
