import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { View, Dimensions, Image } from 'react-native';

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
import Album from './components';

type AlbumsProps = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: Radios;
  setRadioIndex: (nextIndex: number) => void;
};

type ScrollToAlbumArgs = { radioIndex: number; animated: boolean };

export type AlbumsHandler = {
  scrollToAlbum: (args: ScrollToAlbumArgs) => void;
};

const Albums: React.ForwardRefRenderFunction<AlbumsHandler, AlbumsProps> = (
  { y, radios, setRadioIndex, radioIndex },
  ref,
) => {
  const flatListRef = useRef<FlatList<any>>(null);

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

  const scrollToAlbum = ({ radioIndex, animated }: ScrollToAlbumArgs) => {
    flatListRef.current?.scrollToOffset({
      offset: radioIndex * width,
      animated,
    });
  };
  useEffect(() => {
    scrollToAlbum({ radioIndex, animated: false });
  }, [radios]);

  useImperativeHandle(ref, () => ({
    scrollToAlbum,
  }));

  const onScrollEndDrag = () => {
    // console.log('onScrollEndDrag');
  };

  const onViewableItemsChanged = ({
    changed,
  }: {
    changed: { index: number }[];
  }) => {
    console.log('onViewableItemsChanged', changed[0].index);
    setRadioIndex(changed[0].index);
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90,
    waitForInteraction: true,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderItem = useCallback(({ item }) => {
    return <Album item={item} />;
  }, []);

  return (
    <Animated.View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={200}
        decelerationRate={'fast'}
        horizontal
        snapToInterval={width}
        disableIntervalMomentum
        onScrollEndDrag={onScrollEndDrag}
        data={radios}
        keyExtractor={({ title_song }) => `${title_song}`}
        renderItem={renderItem}
      />
    </Animated.View>
  );
};

export default forwardRef(Albums);
