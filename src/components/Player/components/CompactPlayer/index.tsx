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
import { Radios } from '~/components/Radios';

type CompactPlayerType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: Radios;
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
  playing: boolean;
  stopped: boolean;
  buffering: boolean;
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

    return radios[radioIndex]?.radio_name;
  }, [radios, radioIndex]);

  const description = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.title_song;
  }, [radios, radioIndex]);

  return (
    <>
      <Animated.View style={[styles.container, style]}>
        <RectButton
          style={styles.compactButton}
          onPress={() => onExpandPlayer()}>
          <View style={styles.info}>
            <Text style={[styles.title]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.description]} numberOfLines={1}>
              {description}
            </Text>
          </View>

          <View style={styles.controls}>
            <BorderlessButton style={styles.button} onPress={() => {}}>
              <Icon name="heart-outline" size={25} color="#444" />
            </BorderlessButton>

            <View style={styles.buttonContainer}>
              <BorderlessButton
                style={styles.button}
                onPress={onTogglePlayback}
                enabled={!buffering}>
                {stopped && (
                  <Icon
                    name="play"
                    size={30}
                    color="#444"
                    style={styles.playButton}
                  />
                )}
                {playing && (
                  <Icon
                    name="ios-pause-sharp"
                    size={30}
                    color="#444"
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
