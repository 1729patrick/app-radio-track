import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Radios } from '~/components/Radios';
import { SNAP_POINTS } from '../../constants';
import styles from './styles';

type ArtistType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: Radios;
};

const Artist: React.FC<ArtistType> = ({ y, radioIndex, radios }) => {
  const title = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.artist_song;
  }, [radios, radioIndex]);

  const description = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.radio_name;
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
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </Animated.View>
    </View>
  );
};

export default Artist;
