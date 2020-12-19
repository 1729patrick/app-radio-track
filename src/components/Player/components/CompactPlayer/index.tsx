import React, { memo } from 'react';
import { View } from 'react-native';
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

import StyleGuide from '~/utils/StyleGuide';
import RoundButton from '~/components/Button/Round';
import { RadioType } from '~/types/Station';
import { useFavorites } from '~/contexts/FavoriteContext';
import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../Contents/constants';

import TextTicker from 'react-native-text-ticker';

type CompactPlayerProps = {
  y?: Animated.SharedValue<number>;
  contentY?: Animated.SharedValue<number>;
  onPress: () => void;
  playing: boolean;
  buffering: boolean;
  onTogglePlayback: () => void;
  radio: RadioType;
  error: boolean;
  rippleColor?: string;
  top?: number;
};

const CompactPlayer: React.FC<CompactPlayerProps> = ({
  y,
  contentY,
  onPress,
  playing,
  buffering,
  onTogglePlayback,
  radio,
  error,
  rippleColor = StyleGuide.palette.secondary,
  top,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const style = useAnimatedStyle(() => {
    if (!y) {
      return {};
    }

    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[1] * 0.85, SNAP_POINTS[1]],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  }, [y]);

  const styleContent = useAnimatedStyle(() => {
    if (!contentY) {
      return {};
    }

    return {
      top,
      opacity: interpolate(
        contentY.value,
        [CONTENT_SNAP_POINTS[1] * 0.3, CONTENT_SNAP_POINTS[0]],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  }, [contentY]);

  return (
    <>
      <Animated.View style={[styles.container, styleContent, style]}>
        <RectButton
          style={styles.compactButton}
          onPress={onPress}
          rippleColor={rippleColor}>
          <View style={styles.info}>
            <TextTicker
              bounce={false}
              style={[styles.title]}
              loop
              scrollSpeed={450}
              easing={Easing.linear}>
              {radio.name || ''}
            </TextTicker>
            {(radio.slogan || radio.city?.name) && (
              <TextTicker
                bounce={false}
                style={[styles.description]}
                loop
                scrollSpeed={450}
                easing={Easing.linear}>
                {radio.slogan || radio.city?.name || ''}
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
                onPress={onTogglePlayback}>
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
                    name="reload"
                    size={23}
                    color={StyleGuide.palette.primary}
                  />
                )}
              </BorderlessButton>
              {buffering && !error && (
                <View pointerEvents={'none'} style={styles.loader}>
                  <LottieView
                    source={require('~/assets/loader.json')}
                    autoPlay
                    loop
                    speed={1.3}
                  />
                </View>
              )}
            </View>
          </View>
        </RectButton>
      </Animated.View>
    </>
  );
};

export default memo(CompactPlayer);
