import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { SNAP_POINTS } from '../../../constants';
import { BorderlessButton } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import StyleGuide from '~/utils/StyleGuide';

type BottomControlsProps = {
  y: Animated.SharedValue<number>;
  onNextRadio: () => void;
  onPreviousRadio: () => void;
  playing: boolean;
  stopped: boolean;
  buffering: boolean;
  onTogglePlayback: () => void;
};

const BottomControls: React.FC<BottomControlsProps> = ({
  y,
  onNextRadio,
  onPreviousRadio,
  onTogglePlayback,
  playing,
  stopped,
  buffering,
}) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[0], SNAP_POINTS[1] * 0.2],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <BorderlessButton
        rippleColor={StyleGuide.palette.primary}
        style={styles.button}
        onPress={onPreviousRadio}>
        <Icon
          name="play-skip-back-sharp"
          size={30}
          color={StyleGuide.palette.primary}
        />
      </BorderlessButton>

      <View style={styles.playContainer}>
        <View style={styles.playBackground} />
        <BorderlessButton
          rippleColor={StyleGuide.palette.primary}
          style={styles.playButton}
          onPress={onTogglePlayback}
          enabled={!buffering}>
          {stopped && (
            <Icon name="play" size={30} color={StyleGuide.palette.primary} />
          )}
          {playing && (
            <Icon
              name="ios-pause-sharp"
              size={30}
              color={StyleGuide.palette.primary}
            />
          )}

          {buffering && (
            <LottieView
              source={require('~/assets/loader.json')}
              autoPlay
              loop
              style={styles.loader}
              speed={1.3}
            />
          )}
        </BorderlessButton>
      </View>

      <BorderlessButton
        rippleColor={StyleGuide.palette.primary}
        style={styles.button}
        onPress={onNextRadio}>
        <Icon
          name="play-skip-forward"
          size={30}
          color={StyleGuide.palette.primary}
        />
      </BorderlessButton>
    </Animated.View>
  );
};

export default BottomControls;

// https://lottiefiles.com/6722-loading
