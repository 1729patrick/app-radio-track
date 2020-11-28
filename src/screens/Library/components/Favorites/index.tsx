import React, { useCallback, useRef, forwardRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  //@ts-ignore
  runOnJS,
} from 'react-native-reanimated';
import { useFavorites } from '~/contexts/FavoriteContext';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/screens/Playlist/components/Radio';

import styles from './styles';

import useAnimatedHeader from '~/hooks/useAnimatedHeader';

type HistoryProps = {
  translateY: Animated.SharedValue<number>;
  refreshTranslateY: (from: string) => void;
};

Animated.FlatList = Animated.createAnimatedComponent(FlatList);

const Favorites: React.FC<HistoryProps> = (
  { translateY, refreshTranslateY },
  ref,
) => {
  const { scrollHandler } = useAnimatedHeader(translateY);
  const { onExpandPlayer } = usePlayer();
  const { favorites } = useFavorites();

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      onExpandPlayer({
        title: 'Favoritos',
        radios: favorites,
        radioIndex,
      });
    },
    [onExpandPlayer, favorites],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio item={item} index={index} onExpandPlayer={onExpandPlayerPress} />
      );
    },
    [onExpandPlayerPress],
  );

  return (
    <Animated.FlatList
      ref={ref}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={12}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      data={favorites}
      keyExtractor={({ id }) => `${id}`}
      renderItem={renderItem}
      // onScroll={scrollHandler}
      onEndReachedThreshold={4}
      onScrollEndDrag={() => refreshTranslateY('favorites')}
    />
  );
};

export default forwardRef(Favorites);
