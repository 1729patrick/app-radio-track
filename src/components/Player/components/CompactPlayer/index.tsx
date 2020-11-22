import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import styles from './styles';

import { SNAP_POINTS } from '../../constants';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

import { PlayerState } from '../../';
import StyleGuide from '~/utils/StyleGuide';
import RoundButton from '~/components/Button/Round';
import { RadioType } from '~/types/Station';

type CompactPlayerType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: RadioType[];
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
  playing: boolean;
  stopped: boolean;
  buffering: boolean;
  seeking: boolean;
  onTogglePlayback: () => void;
};

const CompactPlayer: React.FC<CompactPlayerType> = ({
  y,
  onExpandPlayer,
  radioIndex,
  radios,
  playing,
  stopped,
  buffering,
  seeking,
  onTogglePlayback,
}) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[1] * 0.85, SNAP_POINTS[1]],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const styleBackground = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[1] * 0.99, SNAP_POINTS[1]],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const title = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.name;
  }, [radios, radioIndex]);

  const description = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.slogan;
  }, [radios, radioIndex]);

  return (
    <>
      <Animated.View style={[styles.container, style]}>
        <RectButton
          style={styles.compactButton}
          onPress={() => onExpandPlayer()}
          rippleColor={StyleGuide.palette.secondary}>
          <View style={styles.info}>
            <Text style={[styles.title]} numberOfLines={1}>
              {title}
            </Text>
            {description && (
              <Text style={[styles.description]} numberOfLines={1}>
                {description}
              </Text>
            )}
          </View>

          <View style={styles.controls}>
            <RoundButton
              name="heart-outline"
              size={23}
              onPress={() => {}}
              Icon={Icon}
            />

            <View style={styles.buttonContainer}>
              <BorderlessButton
                rippleColor={StyleGuide.palette.primary}
                style={styles.button}
                onPress={onTogglePlayback}
                enabled={!buffering}>
                {(stopped || seeking) && (
                  <Icon
                    name="play"
                    size={buffering ? 18 : 25}
                    color={StyleGuide.palette.primary}
                    style={styles.playButton}
                  />
                )}
                {playing && !seeking && (
                  <Icon
                    name="ios-pause-sharp"
                    size={25}
                    color={StyleGuide.palette.primary}
                    style={styles.stopButton}
                  />
                )}
              </BorderlessButton>
              {buffering && (
                <LottieView
                  source={require('~/assets/loader.json')}
                  autoPlay
                  loop
                  style={styles.loader}
                  speed={1.3}
                />
              )}
            </View>
          </View>
        </RectButton>
      </Animated.View>
      <Animated.View style={[styles.background, styleBackground]} />
    </>
  );
};

export default CompactPlayer;
