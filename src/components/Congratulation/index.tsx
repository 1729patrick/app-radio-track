import isEqual from 'lodash.isequal';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  PanGestureHandler,
  RectButton,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import { lighten } from 'polished';

const { height } = Dimensions.get('window');
const SNAP_POINTS = [85, height];

const TIMING_DURATION = 300;
const Congratulation = () => {
  const [starLevel, setStarLevel] = useState(0);
  const translateY = useSharedValue(SNAP_POINTS[0]);
  const animationRef = useRef<LottieView>(null);
  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(point, {
        duration: TIMING_DURATION,
      });
    },
    [translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    SNAP_POINTS,
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

  return (
    <Animated.View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={panHandler} shouldCancelWhenOutside>
        <Animated.View style={[styles.content, style]}>
          <View style={styles.indicator} />
          <View style={styles.card}>
            <Text style={styles.title}>
              Aeee, Você acabou de ouvir 5 rádios 🎉
            </Text>
            <View>
              <LottieView
                ref={animationRef}
                source={require('~/assets/love.json')}
                style={styles.winner}
                speed={1}
                autoPlay
              />

              <Text style={styles.description}>
                Gostaria de avaliar a sua experiência?
              </Text>

              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableWithoutFeedback onPress={() => setStarLevel(star)}>
                    <Icon
                      name={starLevel >= star ? 'star' : 'staro'}
                      size={33}
                      style={styles.star}
                      color={
                        starLevel >= star
                          ? '#F5E960'
                          : StyleGuide.palette.primary
                      }
                    />
                  </TouchableWithoutFeedback>
                ))}
              </View>

              {starLevel === 5 && (
                <>
                  <View
                    style={{
                      width: '100%',
                      height: 45,
                      borderRadius: 4,
                      marginTop: StyleGuide.spacing * 4,
                      backgroundColor: lighten(0.1, StyleGuide.palette.border),
                    }}>
                    <RectButton
                      style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      rippleColor={StyleGuide.palette.border}>
                      <Text
                        style={{
                          ...StyleGuide.typography.headline,
                          fontSize: 15,
                          letterSpacing: 0.7,
                        }}>
                        AVALIAR NA PLAYSTORE
                      </Text>
                    </RectButton>
                  </View>
                  <Text
                    style={{
                      ...StyleGuide.typography.headline,
                      fontSize: 13,
                      letterSpacing: 0.6,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: StyleGuide.palette.light,
                      marginTop: StyleGuide.spacing * 2,
                    }}>
                    AVALIAR MAIS TARDE
                  </Text>
                </>
              )}

              {starLevel > 0 && starLevel < 5 && (
                <>
                  <TextInput
                    multiline
                    style={{
                      ...StyleGuide.typography.caption,
                      marginTop: StyleGuide.spacing * 4,
                      fontSize: 15,
                      backgroundColor: lighten(0.1, StyleGuide.palette.border),
                      paddingLeft: StyleGuide.spacing * 2,
                    }}
                    placeholder="Descreva a sua experiência(opcional)"
                  />
                  <Text
                    style={{
                      ...StyleGuide.typography.headline,
                      fontSize: 13,
                      letterSpacing: 0.6,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: StyleGuide.palette.light,
                      marginTop: StyleGuide.spacing * 2,
                    }}>
                    CONFIRMAR
                  </Text>
                </>
              )}
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default memo(Congratulation, isEqual);
