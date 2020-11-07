import React from 'react';
import {
  View,
  Text,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

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
  PADDING_HORIZONTAL,
} from '../../constants';
import { Radios } from '~/components/Radios';

type AlbumsType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: Radios;
  setRadioIndex: (nextIndex: number) => void;
};

const Albums: React.FC<AlbumsType> = ({
  y,
  radioIndex,
  radios,
  setRadioIndex,
}) => {
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
            [1, (COMPACT_HEIGHT - PADDING_HORIZONTAL) / width],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const onScrollEndDrag = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = nativeEvent.contentOffset.x / width;

    setRadioIndex(nextIndex);
  };

  return (
    <Animated.View style={[styles.container, style]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        horizontal
        snapToInterval={width}
        disableIntervalMomentum
        onMomentumScrollEnd={onScrollEndDrag}
        data={radios}
        keyExtractor={({ radio_id }) => `${radio_id}`}
        renderItem={({ item }) => {
          return (
            <View style={[styles.card]}>
              <View style={styles.cardImage} />
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

export default Albums;
