import React, {
  forwardRef,
  memo,
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
  TextInput,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import InAppReview from 'react-native-in-app-review';
import { useKeyboard } from '~/hooks/useKeyboard';
import RectButton from '../Buttons/RectButton';
import WithoutFeedbackButton from '../Buttons/WithoutFeedback';
import Input from '../Input';
import ModalBackground from '../ModalBackground';

const { height } = Dimensions.get('window');

const TIMING_DURATION = 250;

type ReviewProps = {
  onDismiss: () => void;
  onConfirm: (args: { starLevel: number; notes: string }) => void;
  onRateApp: (args: { starLevel: number }) => void;
};

export type ReviewHandler = { show: (count: number) => void };

const Review: React.ForwardRefRenderFunction<ReviewHandler, ReviewProps> = (
  { onConfirm, onRateApp, onDismiss },
  ref,
) => {
  const { keyboardHeight } = useKeyboard();

  const [radioCount, setRadiosCount] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const reviewNotesRef = useRef('');

  const snapPoints = useMemo(() => [contentHeight, height], [contentHeight]);
  const [starLevel, setStarLevel] = useState(0);
  const translateY = useSharedValue(snapPoints[1]);
  const animationRef = useRef<LottieView>(null);
  const inputRef = useRef<TextInput>(null);

  const onEnd = useCallback(() => {
    'worklet';

    if (translateY.value === snapPoints[1]) {
      runOnJS(setRadiosCount)(0);
      runOnJS(setStarLevel)(0);
    }
  }, [snapPoints, translateY.value]);

  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(
        point,
        {
          duration: TIMING_DURATION,
        },
        onEnd,
      );
    },
    [onEnd, translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    snapPoints,
    animateToPoint,
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const styleKeyboard = useAnimatedStyle(() => {
    return {
      paddingBottom: keyboardHeight,
    };
  }, [keyboardHeight]);

  const styleFakeBackground = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        translateY.value,
        snapPoints,
        [0, -height / 2],
        Extrapolate.CLAMP,
      ),
    };
  }, [translateY.value]);

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setContentHeight(height - nativeEvent.layout.height);
  }, []);

  const onRateAppReview = useCallback(() => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview();
    }

    animateToPoint(snapPoints[1]);
    onRateApp({ starLevel });
  }, [animateToPoint, onRateApp, snapPoints, starLevel]);

  const onConfirmReview = useCallback(() => {
    animateToPoint(snapPoints[1]);
    onConfirm({ starLevel, notes: reviewNotesRef.current });
  }, [animateToPoint, onConfirm, snapPoints, starLevel]);

  const onDismissReview = useCallback(() => {
    if (translateY.value === snapPoints[0]) {
      animateToPoint(snapPoints[1]);
      onDismiss();
    }
  }, [animateToPoint, onDismiss, snapPoints, translateY.value]);

  const setReviewNotes = useCallback((notes: string) => {
    reviewNotesRef.current = notes;
  }, []);

  useEffect(() => {
    if (snapPoints[0] && radioCount) {
      animateToPoint(snapPoints[0]);
    }
  }, [animateToPoint, snapPoints, radioCount]);

  useImperativeHandle(ref, () => ({
    show: (count) => setRadiosCount(count),
  }));

  const onSelectStarLevel = (star: number) => {
    if (star < 5) {
      inputRef.current?.focus();
    }

    setStarLevel(star);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const modalOpen = translateY.value === snapPoints[0];
      if (modalOpen) {
        onDismissReview();

        return true;
      }

      return false;
    });
  }, [onDismissReview, snapPoints, translateY.value]);

  if (!radioCount) {
    return null;
  }

  return (
    <Animated.View style={styles.container} pointerEvents="box-none">
      <ModalBackground
        translateY={translateY}
        snapPoints={snapPoints}
        onPress={onDismissReview}
      />

      <Animated.View style={[styles.fakeBackground, styleFakeBackground]} />

      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View
          style={[styles.content, style, styleKeyboard]}
          onLayout={onLayout}>
          <View style={styles.indicator} />
          <View style={styles.card}>
            <Text style={styles.title}>
              Você ouviu {radioCount} rádios.{'\n'}Que legal 🎉
            </Text>

            <LottieView
              ref={animationRef}
              source={require('~/assets/robot.json')}
              style={styles.winner}
              speed={1}
              autoPlay
            />

            <View>
              <Text style={styles.description}>
                Gostaria de avaliar a sua experiência?
              </Text>

              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableWithoutFeedback
                    hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                    onPress={() => onSelectStarLevel(star)}
                    key={star}>
                    <Icon
                      name={starLevel >= star ? 'star' : 'staro'}
                      size={33}
                      style={styles.star}
                      color={
                        starLevel >= star
                          ? StyleGuide.palette.app
                          : StyleGuide.palette.primary
                      }
                    />
                  </TouchableWithoutFeedback>
                ))}
              </View>

              <View pointerEvents={starLevel ? 'auto' : 'none'}>
                <View
                  style={[
                    styles.fiveStarContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      opacity: starLevel === 5 ? 1 : 0,
                    },
                  ]}>
                  <RectButton
                    title={'AVALIAR'}
                    onPress={onRateAppReview}
                    containerStyle={styles.button}
                  />
                  <WithoutFeedbackButton
                    title={'AVALIAR MAIS TARDE'}
                    onPress={onDismissReview}
                  />
                </View>

                <View
                  pointerEvents={starLevel !== 5 ? 'auto' : 'none'}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ opacity: starLevel > 0 && starLevel < 5 ? 1 : 0 }}>
                  <Input
                    placeholder={'Descreva a sua experiência (opcional)'}
                    onChangeText={setReviewNotes}
                    ref={inputRef}
                  />
                  <WithoutFeedbackButton
                    title={'CONFIRMAR'}
                    onPress={onConfirmReview}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default memo(forwardRef(Review));
