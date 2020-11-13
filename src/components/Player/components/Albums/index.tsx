import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';

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

type ScrollToAlbumArgs = {
  radioIndex: number;
  animated: boolean;
};

type AlbumsProps = {
  y: Animated.SharedValue<number>;
  radios: Radios;
  setRadioIndex: (nextIndex: number) => void;
  radioIndex: number;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  onAlbumsMounted: () => void;
};

export type AlbumsHandler = {
  scrollToAlbum: (args: ScrollToAlbumArgs) => void;
};

const Albums: React.ForwardRefRenderFunction<AlbumsHandler, AlbumsProps> = (
  {
    y,
    radios,
    setRadioIndex,
    radioIndex,
    loading,
    setLoading,
    onAlbumsMounted,
  },
  ref,
) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [hiddenFlatList, setHiddenFlatList] = useState<boolean>(false);

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

  useImperativeHandle(ref, () => ({
    scrollToAlbum,
  }));

  const onViewableItemsChanged = ({
    changed,
  }: {
    changed: { index: number }[];
  }) => {
    if (!loading) {
      setRadioIndex(changed[0].index);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90,
    waitForInteraction: false,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  useEffect(() => {
    if (hiddenFlatList) {
      setHiddenFlatList(false);
    }
  }, [hiddenFlatList]);

  useEffect(() => {
    if (!hiddenFlatList) {
      const timeout = setTimeout(() => {
        setLoading(false);
        onAlbumsMounted();
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [hiddenFlatList, onAlbumsMounted, setLoading]);

  useEffect(() => {
    setHiddenFlatList(true);
  }, [radios, setLoading]);

  const renderItem = useCallback(({ item }) => {
    return <Album item={item} />;
  }, []);

  return (
    <Animated.View style={[styles.container, style]}>
      {!hiddenFlatList && (
        <FlatList
          ref={flatListRef}
          onLayout={() => {
            scrollToAlbum({
              radioIndex,
              animated: false,
            });
          }}
          removeClippedSubviews
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          decelerationRate={'fast'}
          horizontal
          snapToInterval={width}
          disableIntervalMomentum
          data={radios}
          keyExtractor={({ title_song }) => `${title_song}`}
          renderItem={renderItem}
        />
      )}
      {loading && <Album item={radios[radioIndex]} />}
    </Animated.View>
  );
};

export default forwardRef(Albums);