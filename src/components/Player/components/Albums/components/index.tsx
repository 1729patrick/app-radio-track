import React, { memo } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  COMPACT_HEIGHT,
  PADDING_HORIZONTAL,
  SNAP_POINTS,
} from '~/components/Player/constants';

import { image } from '~/services/api';
import { RadioType } from '~/types/Station';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

type AlbumsProps = {
  item?: RadioType;
  error?: boolean;
  contentY: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};

const Album: React.FC<AlbumsProps> = ({ item, error, contentY, y }) => {
  const style = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      y.value,
      [SNAP_POINTS[1] * 0.25, SNAP_POINTS[1]],
      [StyleGuide.borderRadius * 5, StyleGuide.borderRadius * 15],
      Extrapolate.CLAMP,
    );

    console.log(y, borderRadius);
    return {
      borderRadius,
    };
  }, [y]);

  return (
    <Animated.View style={[styles.card]}>
      <Animated.Image
        style={[styles.image, style]}
        source={{
          uri: image(item?.img),
        }}
      />
      {/* {error && (
        <View style={[styles.notFoundContainer]}>
          <LottieView
            source={require('~/assets/radio_not_found.json')}
            autoPlay
            loop
            style={styles.notFound}
          />
          <Text style={styles.notFoundTitle}>🚨 Rádio fora do ar 🚨</Text>
        </View>
      )} */}
    </Animated.View>
  );
};

export default memo(Album);
