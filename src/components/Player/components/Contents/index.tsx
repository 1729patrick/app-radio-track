import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import { TIMING_DURATION } from '../../constants';

import styles from './styles';

const { height } = Dimensions.get('window');

const SNAP_POINTS = [0, height - 70];

const Contents = () => {
  const translateY = useSharedValue(SNAP_POINTS[1]);

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

  const y = useDerivedValue(() => {
    const validY = interpolate(
      translateY.value,
      SNAP_POINTS,
      SNAP_POINTS,
      Extrapolate.CLAMP,
    );

    return validY;
  }, [translateY.value]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  }, [y.value]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[styles.content, style]}>
          <View style={styles.indicator} />

          <View style={styles.header}>
            {/* <Text style={styles.tab}>Comentários</Text> */}
            <Text style={styles.tab}>Detalhes</Text>
            <Text style={styles.tab}>Relacionadas</Text>
          </View>

          <View style={styles.tabIndicator} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Contents;
