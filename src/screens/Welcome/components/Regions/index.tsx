import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import Indicator from '~/components/Indicator';
import { REGIONS } from '~/data/regions';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import { RegionType } from '~/screens/Explore/components/Regions';
import {
  REGIONS_PADDING_TOP,
  REGIONS_SNAP_POINTS,
  REGIONS_TIMING_DURATION,
} from './constants';
import Region from './Region';

import styles from './styles';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const Regions = () => {
  const translateY = useSharedValue(REGIONS_SNAP_POINTS[0]);
  const scrollY = useSharedValue(0);

  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(point, {
        duration: REGIONS_TIMING_DURATION,
      });
    },
    [translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    REGIONS_SNAP_POINTS,
    animateToPoint,
  );

  const scrollHandler = useAnimatedScrollHandler<{}>(
    {
      onScroll: (event) => {
        scrollY.value = clamp(
          event.contentOffset.y,
          0,
          REGIONS_PADDING_TOP - HEADER_HEIGHT - STATUS_BAR_HEIGHT,
        );
      },
    },
    [],
  );

  const style = useAnimatedStyle(() => {
    console.log('translateY.value', translateY.value);
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const styleScroll = useAnimatedStyle(() => {
    console.log('scrollY.value', scrollY.value);
    return {
      transform: [
        {
          translateY: -scrollY.value,
        },
      ],
    };
  }, [scrollY.value]);

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View>
          <Animated.View style={[styles.header, style, styleScroll]}>
            <Indicator />
            <Text style={styles.title}>Escolha seu estado</Text>
          </Animated.View>

          <Animated.View style={[styles.content, style]}>
            <AnimatedScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}>
              {REGIONS.map((region: RegionType) => (
                <Region {...region} key={region.id} />
              ))}
            </AnimatedScrollView>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default memo(Regions);
