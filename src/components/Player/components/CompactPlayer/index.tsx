import React from 'react';
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
import { useFavorites } from '~/contexts/FavoriteContext';

type CompactPlayerType = {
  y: Animated.SharedValue<number>;
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
  playing: boolean;
  stopped: boolean;
  buffering: boolean;
  seeking: boolean;
  onTogglePlayback: () => void;
  radio: RadioType;
  error: boolean;
};

const CompactPlayer: React.FC<CompactPlayerType> = ({
  y,
  onExpandPlayer,
  playing,
  stopped,
  buffering,
  seeking,
  onTogglePlayback,
  radio,
  error,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

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

  return (
    <>
      <Animated.View style={[styles.container, style]}>
        <RectButton
          style={styles.compactButton}
          onPress={() => onExpandPlayer()}
          rippleColor={StyleGuide.palette.secondary}>
          <View style={styles.info}>
            <Text style={[styles.title]} numberOfLines={1}>
              {radio.name}
            </Text>
            {(radio.slogan || radio.city?.name) && (
              <Text style={[styles.description]} numberOfLines={1}>
                {radio.slogan || radio.city?.name}
              </Text>
            )}
          </View>

          <View style={styles.controls}>
            {isFavorite(radio) ? (
              <RoundButton
                name="heart-sharp"
                size={25}
                onPress={() => removeFavorite(radio)}
                Icon={Icon}
              />
            ) : (
              <RoundButton
                name="heart-outline"
                size={25}
                onPress={() => addFavorite(radio)}
                Icon={Icon}
              />
            )}

            <View style={styles.buttonContainer}>
              <BorderlessButton
                rippleColor={StyleGuide.palette.primary}
                style={styles.button}
                onPress={onTogglePlayback}
                enabled={!buffering && !error}>
                {(stopped || seeking) && !error && (
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
                {error && (
                  <Icon
                    name="alert"
                    size={25}
                    color={StyleGuide.palette.primary}
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
