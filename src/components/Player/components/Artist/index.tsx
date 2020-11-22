import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Radios } from '~/components/Radios';
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

  return (
    <View>
      <Animated.View style={[styles.container, style]}>
        <Text style={[styles.title]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.description]} numberOfLines={1}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Artist;
