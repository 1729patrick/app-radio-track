import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import RoundButton from '~/components/Button/Round';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioType } from '~/types/Station';
import { SNAP_POINTS } from '../../constants';
import styles from './styles';

type ArtistType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: RadioType[];
};

const Artist: React.FC<ArtistType> = ({ y, radioIndex, radios }) => {
  const title = useMemo(() => {
    if (!radios?.length || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.name;
  }, [radios, radioIndex]);

  const description = useMemo(() => {
    if (!radios?.length || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.slogan;
  }, [radios, radioIndex]);

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

  const onVoteDownPress = () => {};
  const onVoteUpPress = () => {};

  return (
    <View>
      <Animated.View style={[styles.container, style]}>
        <View style={styles.info}>
          <RoundButton
            Icon={Icon}
            name="thumbs-o-down"
            size={27}
            onPress={onVoteDownPress}
          />
          <Text style={[styles.title]} numberOfLines={1}>
            {title}
          </Text>
          <RoundButton
            Icon={Icon}
            name="thumbs-o-up"
            size={27}
            onPress={onVoteUpPress}
          />
        </View>

        <Text style={[styles.description]} numberOfLines={1}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Artist;
