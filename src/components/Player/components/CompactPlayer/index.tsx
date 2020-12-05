import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Easing,
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

import TextTicker from 'react-native-text-ticker';

type CompactPlayerType = {
  y: Animated.SharedValue<number>;
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
  playing: boolean;
  buffering: boolean;
  onTogglePlayback: () => void;
  radio: RadioType;
  error: boolean;
};

const CompactPlayer: React.FC<CompactPlayerType> = ({
  y,
  onExpandPlayer,
  playing,
  buffering,
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
            <TextTicker
              bounce={false}
              style={[styles.title]}
              loop
              scrollSpeed={450}
              easing={Easing.linear}>
              {radio.name}
            </TextTicker>
            {(radio.slogan || radio.city?.name) && (
              <TextTicker
                bounce={false}
                style={[styles.description]}
                loop
                scrollSpeed={450}
                easing={Easing.linear}>
                {radio.slogan || radio.city?.name}
              </TextTicker>
            )}
          </View>

          <View style={styles.controls}>
            {isFavorite(radio) ? (
              <RoundButton
                name="heart-sharp"
                size={23}
                onPress={() => removeFavorite(radio)}
                Icon={Icon}
              />
            ) : (
              <RoundButton
                name="heart-outline"
                size={23}
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
                {!playing && !error && (
                  <Icon
                    name="play"
                    size={buffering ? 15 : 23}
                    color={StyleGuide.palette.primary}
                    style={styles.playButton}
                  />
                )}
                {playing && !error && (
                  <Icon
                    name="ios-pause-sharp"
                    size={buffering ? 15 : 23}
                    color={StyleGuide.palette.primary}
                    style={styles.stopButton}
                  />
                )}
                {error && (
                  <Icon
                    name="alert"
                    size={23}
                    color={StyleGuide.palette.primary}
                  />
                )}
              </BorderlessButton>
              {buffering && !error && (
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
