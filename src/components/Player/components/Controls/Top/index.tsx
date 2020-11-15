import React from 'react';
import { Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import { SNAP_POINTS } from '../../../constants';
import { BorderlessButton } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';

type TopControlsProps = {
  y: Animated.SharedValue<number>;
  onCompactPlayer: () => void;
  title?: string;
};

const TopControls: React.FC<TopControlsProps> = ({
  y,
  onCompactPlayer,
  title,
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
        onPress={onCompactPlayer}>
        <Icon
          name="ios-chevron-down-sharp"
          size={25}
          color={StyleGuide.palette.primary}
        />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      <BorderlessButton
        rippleColor={StyleGuide.palette.primary}
        style={styles.button}>
        <Icon
          name="heart-outline"
          size={25}
          color={StyleGuide.palette.primary}
        />
      </BorderlessButton>
    </Animated.View>
  );
};

export default TopControls;
