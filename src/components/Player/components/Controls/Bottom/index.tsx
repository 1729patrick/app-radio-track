import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import getStyles from './styles';

import { SNAP_POINTS } from '../../../constants';
import { BorderlessButton } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

import RoundButton from '~/components/Button/Round';
import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../../Contents/constants';
import { CONTROLS_BOTTOM_HEIGHT } from './constants';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';

type BottomControlsProps = {
  y: Animated.SharedValue<number>;
  contentY: Animated.SharedValue<number>;
  onNextRadio: () => void;
  onPreviousRadio: () => void;
  playing: boolean;
  buffering: boolean;
  onTogglePlayback: () => void;
  error: boolean;
  radioIndex: number;
  radiosLength: number;
};

const BottomControls: React.FC<BottomControlsProps> = ({
  y,
  contentY,
  onNextRadio,
  onPreviousRadio,
  onTogglePlayback,
  playing,
  buffering,
  error,
  radioIndex,
  radiosLength,
}) => {
  const styles = useStyles(getStyles);
  const { palette } = useTheme();

  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[0], SNAP_POINTS[1] * 0.2],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, [y.value]);

  const styleContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        contentY.value,
        [CONTENT_SNAP_POINTS[1], CONTENT_SNAP_POINTS[1] * 0.75],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, [contentY.value]);

  return (
    <View style={{ height: CONTROLS_BOTTOM_HEIGHT }}>
      <Animated.View style={[styles.container, styleContent, style]}>
        <RoundButton
          name={'play-skip-back-sharp'}
          size={30}
          onPress={onPreviousRadio}
          Icon={Icon}
          disabled={!radioIndex}
        />

        <View style={styles.playContainer}>
          <View style={styles.playBackground} />

          <BorderlessButton
            rippleColor={palette.primary}
            style={styles.playButton}
            onPress={onTogglePlayback}>
            {!playing && !error && (
              <Icon name="play" size={30} color={palette.primary} />
            )}
            {playing && !error && (
              <Icon name="ios-pause-sharp" size={30} color={palette.primary} />
            )}

            {error && <Icon name="reload" size={32} color={palette.primary} />}

            {buffering && !error && (
              <LottieView
                source={require('~/assets/loader.json')}
                autoPlay
                loop
                style={styles.loader}
                colorFilters={[
                  {
                    keypath: 'Camada de forma 1',
                    color: palette.primary,
                  },
                  {
                    keypath: 'Camada de forma 2',
                    color: palette.primary,
                  },
                  {
                    keypath: 'Camada de forma 3',
                    color: palette.primary,
                  },
                  {
                    keypath: 'Camada de forma 4',
                    color: palette.primary,
                  },
                ]}
                speed={1.3}
              />
            )}
          </BorderlessButton>
        </View>

        <RoundButton
          name="play-skip-forward"
          size={30}
          onPress={onNextRadio}
          Icon={Icon}
          disabled={radioIndex + 1 === radiosLength}
        />
      </Animated.View>
    </View>
  );
};

export default memo(BottomControls);
