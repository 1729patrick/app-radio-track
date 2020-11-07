import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import styles from './styles';
const { width, height } = Dimensions.get('window');

import {
  COMPACT_HEIGHT,
  SNAP_POINTS,
  ARTIST_AND_CONTROL_HEIGHT,
  HORIZONTAL_PADDING,
} from '../../constants';

interface PropTypes {
  y: Animated.SharedValue<number>;
}

const Albums = ({ y }: PropTypes) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            y.value,
            [SNAP_POINTS[1] * 0.25, SNAP_POINTS[1]],
            [
              0,
              -(width - COMPACT_HEIGHT) / 2 -
                (height - (width + ARTIST_AND_CONTROL_HEIGHT)) / 2,
            ],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            y.value,
            [SNAP_POINTS[1] * 0.25, SNAP_POINTS[1]],
            [0, -(width - COMPACT_HEIGHT) / 2],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            y.value,
            [SNAP_POINTS[1] * 0.25, SNAP_POINTS[1]],
            [1, (COMPACT_HEIGHT - HORIZONTAL_PADDING) / width],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        horizontal
        snapToInterval={width}
        disableIntervalMomentum
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(x) => `${x}`}
        renderItem={({ item }) => {
          return (
            <View style={[styles.item]}>
              <View style={styles.image}>
                <Text>Radio: {item}</Text>
              </View>
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

export default Albums;
