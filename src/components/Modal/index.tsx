import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  Dimensions,
  LayoutChangeEvent,
  Text,
  View,
} from 'react-native';
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
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';

import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

import { MODAL_SNAP_POINTS } from './constants';

import styles from './styles';

const { height } = Dimensions.get('window');

type ModalProps = {
  onContinue: () => void;
  title: string;
  id: string;
  children: ReactNode;
  confirm: string;
};

export type ModalHandler = {
  show: (snapPoint?: number) => void;
};

const Modal: React.ForwardRefRenderFunction<ModalHandler, ModalProps> = (
  { onContinue, title, children, id, confirm },
  ref,
) => {
  const [snapPoints, setSnapPoints] = useState(MODAL_SNAP_POINTS);
  const translateY = useSharedValue(snapPoints[2]);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined,
  );

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
    snapPoints,
    animateToPoint,
  );

  const show = useCallback(
    (snapPoint?: number) => {
      animateToPoint(snapPoints[snapPoint ?? 1]);
    },
    [animateToPoint, snapPoints],
  );

  const hidden = useCallback(() => {
    animateToPoint(snapPoints[2]);
  }, [animateToPoint, snapPoints]);

  useImperativeHandle(ref, () => ({
    show,
  }));

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const modalOpen = translateY.value !== snapPoints[2];
      if (modalOpen) {
        hidden();

        return true;
      }

      return false;
    });
  }, [hidden, snapPoints, translateY.value]);

  const onLayoutContent = ({ nativeEvent }: LayoutChangeEvent) => {
    const { height: layoutHeight } = nativeEvent.layout;

    if (!layoutHeight) {
      return;
    }

    if (contentHeight) {
      show();
      return;
    }

    setSnapPoints(
      snapPoints.map((snapPointHeight, index) => {
        if (index === 1) {
          const totalModalHeight =
            layoutHeight + HEADER_HEIGHT + STATUS_BAR_HEIGHT;

          return height - totalModalHeight;
        }

        return snapPointHeight;
      }),
    );

    setContentHeight(Math.max(layoutHeight, height));
  };

  useEffect(() => {
    setContentHeight(undefined);
  }, [id]);

  const onComplete = () => {
    onContinue();
    hidden();
  };

  return (
    <View style={styles.container}>
      <ModalBackground
        translateY={translateY}
        snapPoints={[snapPoints[1], snapPoints[2]]}
        onPress={hidden}
      />

      <Animated.View style={[styles.header, style]}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View>
            <Indicator />
            <View style={styles.headerContent}>
              <Text style={styles.title}>{title}</Text>

              <WithoutFeedbackButton
                title={confirm}
                onPress={onComplete}
                titleStyle={styles.titleButtonOK}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <ScrollView
        lowerBound={snapPoints[1]}
        headerHeight={HEADER_HEIGHT + STATUS_BAR_HEIGHT}
        snapPoints={snapPoints}
        translateY={translateY}
        contentContainerStyle={styles.contentContainer}
        animateToPoint={animateToPoint}>
        <View onLayout={onLayoutContent} style={{ height: contentHeight }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(forwardRef(Modal));
