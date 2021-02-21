import React, { memo } from 'react';
import { Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import getStyles from './styles';

import { SNAP_POINTS } from '../../../constants';

import RoundButton from '~/components/Button/Round';
import { useFavorites } from '~/contexts/FavoriteContext';
import { RadioType } from '~/types/Station';

type TopControlsProps = {
  y: Animated.SharedValue<number>;
  contentY: Animated.SharedValue<number>;
  onCompactPlayer: () => void;
  title?: string;
  radio: RadioType;
};
import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../../Contents/constants';
import useStyles from '~/hooks/useStyles';

const TopControls: React.FC<TopControlsProps> = ({
  y,
  onCompactPlayer,
  title,
  radio,
  contentY,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const styles = useStyles(getStyles);

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

  const animatedProps = useAnimatedProps(() => {
    const pointerEvents = y.value === 0 ? 'auto' : 'none';

    return {
      pointerEvents,
    };
  }, [y.value]);

  return (
    <Animated.View
      style={[styles.container, styleContent, style]}
      {...{ animatedProps }}>
      <RoundButton
        name="ios-chevron-down-sharp"
        size={25}
        onPress={onCompactPlayer}
        Icon={Icon}
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
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
    </Animated.View>
  );
};

export default memo(TopControls);
