import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { BackHandler, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import WithoutFeedbackButton from '~/components/Buttons/WithoutFeedback';

import Indicator from '~/components/Indicator';
import ModalBackground from '~/components/ModalBackground';
import ScrollView from '~/components/ScrollView';
import { REGIONS } from '~/data/regions';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';

import { RegionType } from '~/screens/Explore/components/Regions';
import { REGIONS_SNAP_POINTS } from './constants';
import Region from './Region';

import styles from './styles';

const Regions = ({ onContinue }, ref) => {
  const translateY = useSharedValue(REGIONS_SNAP_POINTS[2]);
  const [regionIdChecked, setRegionIdChecked] = useState('');

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, 10000],
            [0, 10000],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translateY.value]);

  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(point, {
        duration: 350,
      });
    },
    [translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    REGIONS_SNAP_POINTS,
    animateToPoint,
  );

  const show = useCallback(() => {
    animateToPoint(REGIONS_SNAP_POINTS[1]);
  }, [animateToPoint]);

  const hidden = useCallback(() => {
    animateToPoint(REGIONS_SNAP_POINTS[2]);
  }, [animateToPoint]);

  useImperativeHandle(ref, () => ({
    show,
  }));

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const modalOpen = translateY.value !== REGIONS_SNAP_POINTS[2];
      if (modalOpen) {
        hidden();

        return true;
      }

      return false;
    });
  }, [hidden, translateY.value]);

  return (
    <View style={styles.container}>
      <ModalBackground
        translateY={translateY}
        snapPoints={[REGIONS_SNAP_POINTS[1], REGIONS_SNAP_POINTS[2]]}
        onPress={hidden}
      />

      <Animated.View style={[styles.header, style]}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View>
            <Indicator />
            <View style={styles.headerContent}>
              <Text style={styles.title}>Escolha o seu estado</Text>

              <WithoutFeedbackButton
                title={'CONTINUAR'}
                onPress={() => onContinue(regionIdChecked)}
                titleStyle={styles.titleButtonOK}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <ScrollView
        lowerBound={REGIONS_SNAP_POINTS[1]}
        snapPoints={REGIONS_SNAP_POINTS}
        translateY={translateY}
        contentContainerStyle={styles.contentContainer}
        animateToPoint={animateToPoint}>
        {REGIONS.map((region: RegionType) => (
          <Region
            {...region}
            key={region.id}
            checked={region.id === regionIdChecked}
            onPress={setRegionIdChecked}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(forwardRef(Regions));
