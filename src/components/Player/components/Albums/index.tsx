import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import styles from './styles';
const { width, height } = Dimensions.get('window');

import {
  COMPACT_HEIGHT,
  SNAP_POINTS,
  PADDING_HORIZONTAL,
  ARTIST_AND_CONTROL_HEIGHT,
} from '../../constants';
import Album from './components/Album';
import { RadioType } from '~/types/Station';

import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../Contents/constants';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';

type ScrollToAlbumArgs = {
  radioIndex: number;
  animated: boolean;
};

type AlbumsProps = {
  y: Animated.SharedValue<number>;
  contentY: Animated.SharedValue<number>;
  radios: RadioType[];
  setRadioIndex: (nextIndex: number) => void;
  radioIndex: number;
  loading?: boolean;
  onAlbumsMounted: () => void;
};

export type AlbumsHandler = {
  scrollToAlbum: (args: ScrollToAlbumArgs) => void;
};

const Albums: React.ForwardRefRenderFunction<AlbumsHandler, AlbumsProps> = (
  { y, contentY, radios, setRadioIndex, radioIndex, loading, onAlbumsMounted },
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
            [0, -(width - COMPACT_HEIGHT * 1.2 - 2) / 2],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            y.value,
            [SNAP_POINTS[1] * 0.25, SNAP_POINTS[1]],
            [1, (COMPACT_HEIGHT * 1.25 - PADDING_HORIZONTAL) / width],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [y.value]);

  const styleContent = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            contentY.value,
            [CONTENT_SNAP_POINTS[0], CONTENT_SNAP_POINTS[1]],
            [
              -(width - COMPACT_HEIGHT) / 2 -
                (height - (width + ARTIST_AND_CONTROL_HEIGHT)) / 2 +
                STATUS_BAR_HEIGHT,
              0.2,
            ],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            contentY.value,
            [CONTENT_SNAP_POINTS[0], CONTENT_SNAP_POINTS[1]],
            [-(width - COMPACT_HEIGHT * 1.2 - 2) / 2, 0],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            contentY.value,
            [CONTENT_SNAP_POINTS[0], CONTENT_SNAP_POINTS[1]],
            [(COMPACT_HEIGHT * 1.25 - PADDING_HORIZONTAL) / width, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [contentY.value]);

  const scrollToAlbum = useCallback(
    ({ radioIndex, animated }: ScrollToAlbumArgs) => {
      flatListRef.current?.scrollToOffset({
        offset: radioIndex * width,
        animated,
      });
    },
    [],
  );

  useImperativeHandle(ref, () => ({
    scrollToAlbum,
  }));

  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: { index: number }[] }) => {
      setRadioIndex(changed[0].index);
    },
    [setRadioIndex],
  );

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 90,
      waitForInteraction: false,
    }),
    [],
  );

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  useEffect(() => {
    if (hiddenFlatList) {
      setHiddenFlatList(false);
    }
  }, [hiddenFlatList]);

  useEffect(() => {
    setHiddenFlatList(true);
  }, [radios]);

  const renderItem = useCallback(
    ({ item }) => {
      return <Album item={item} contentY={contentY} y={y} />;
    },
    [contentY, y],
  );

  const onLayout = useCallback(() => {
    scrollToAlbum({
      radioIndex,
      animated: false,
    });

    onAlbumsMounted();
  }, [onAlbumsMounted, radioIndex, scrollToAlbum]);

  const animatedProps = useAnimatedProps(() => {
    const pointerEvents =
      y?.value === SNAP_POINTS[1] || contentY?.value === CONTENT_SNAP_POINTS[0]
        ? 'none'
        : 'auto';

    return {
      pointerEvents,
    };
  }, [y, contentY]);

  return (
    <Animated.View
      style={[styles.container, styleContent, style]}
      animatedProps={animatedProps}>
      {!hiddenFlatList && (
        <AnimatedFlatList
          ref={flatListRef}
          onLayout={onLayout}
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
          initialNumToRender={1}
          horizontal
          snapToInterval={width}
          disableIntervalMomentum
          data={radios}
          keyExtractor={({ id }) => `${id}`}
          renderItem={renderItem}
        />
      )}
      {loading && <Album item={radios[radioIndex]} contentY={contentY} y={y} />}
    </Animated.View>
  );
};

export default memo(forwardRef(Albums));
