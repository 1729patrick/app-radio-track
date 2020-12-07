import React, { memo, useCallback, useRef } from 'react';
import { View } from 'react-native';
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
import TabNavigator, { TabNavigatorHandler } from './components/TabNavigator';
import Details from './pages/Details';
import Suggest from './pages/Suggest';
import isEqual from 'lodash.isequal';
import CompactPlayer from '../CompactPlayer';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';
import { RadioType } from '~/types/Station';

export type RouteType = { title: string; Component: any };

const ROUTES = [
  { title: 'Detalhes', Component: Details },
  { title: 'Sugeridas', Component: Suggest },
];

type ContentsProps = {
  translateY: Animated.SharedValue<number>;
  playing: boolean;
  buffering: boolean;
  onTogglePlayback: () => void;
  radio: RadioType;
  error: boolean;
};

const Contents: React.FC<ContentsProps> = ({
  translateY,
  playing,
  buffering,
  onTogglePlayback,
  radio,
  error,
}) => {
  const tabNavigatorRef = useRef<TabNavigatorHandler>(null);

  const initializeTabActive = () => {
    tabNavigatorRef.current?.initializeTabActive();
  };

  const onStart = () => {
    'worklet';

    runOnJS(initializeTabActive)();
  };

  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(point, {
        duration: TIMING_DURATION,
        // easing: Easing.out(Easing.cubic),
      });
    },
    [translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    SNAP_POINTS,
    animateToPoint,
    onStart,
  );

  const style = useAnimatedStyle(() => {
    const top = interpolate(
      translateY.value,
      [SNAP_POINTS[1], SNAP_POINTS[1] - 1],
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
      [SNAP_POINTS[1] * 0.95, SNAP_POINTS[0]],
      [0, 1],
    );

    return progress;
  }, [translateY.value]);

  return (
    <Animated.View style={styles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[style]}>
          <CompactPlayer
            top={STATUS_BAR_HEIGHT}
            playing={playing}
            buffering={buffering}
            onTogglePlayback={onTogglePlayback}
            radio={radio || {}}
            error={error}
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
              routes={ROUTES}
              checkAnimated={checkAnimated}
              animation={animation}
              ref={tabNavigatorRef}
              routeProps={{ radio }}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default memo(Contents, isEqual);
