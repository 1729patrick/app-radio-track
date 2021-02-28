import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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

import getStyles from './styles';
import { useTheme } from '~/contexts/ThemeContext';

const { height } = Dimensions.get('window');

type ModalProps = {
  onContinue: () => void;
  title: string;
  children: ReactNode;
  confirm: string;
};

export type ModalHandler = {
  show: (snapPoint?: number) => void;
};

const Modal: React.ForwardRefRenderFunction<ModalHandler, ModalProps> = (
  { onContinue, title, children, confirm },
  ref,
) => {
  const { palette } = useTheme();

  const styles = useMemo(() => {
    return getStyles(palette);
  }, [palette]);

  const [snapPoints, setSnapPoints] = useState(MODAL_SNAP_POINTS);
  const translateY = useSharedValue(snapPoints[MODAL_SNAP_POINTS.length - 1]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const styleContent = useAnimatedStyle(() => {
    return {
      paddingBottom: translateY.value + HEADER_HEIGHT + STATUS_BAR_HEIGHT,
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
      const initialSnapPoint = snapPoints.length - 2;
      animateToPoint(snapPoints[snapPoint ?? initialSnapPoint]);
    },
    [animateToPoint, snapPoints],
  );

  const hidden = useCallback(() => {
    animateToPoint(snapPoints[snapPoints.length - 1]);
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

  const onComplete = () => {
    onContinue();
    hidden();
  };

  return (
    <View style={styles.container}>
      <ModalBackground
        translateY={translateY}
        snapPoints={[
          snapPoints[snapPoints.length - 2],
          snapPoints[snapPoints.length - 1],
        ]}
        onPress={hidden}
      />

      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[styles.header, style]}>
          <Indicator />

          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>

            <WithoutFeedbackButton
              title={confirm}
              onPress={onComplete}
              titleStyle={styles.titleButtonOK}
            />
          </View>

          <Animated.View style={[styles.contentContainer, styleContent]}>
            {children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default memo(forwardRef(Modal));
