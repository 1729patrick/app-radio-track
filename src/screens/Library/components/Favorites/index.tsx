import React, { useCallback, forwardRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { useFavorites } from '~/contexts/FavoriteContext';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/components/Radio/Item';

import styles from './styles';
import { RadioType } from '~/types/Station';

type FavoritesProps = {
  refreshTranslateY: (from: string) => void;
};

Animated.FlatList = Animated.createAnimatedComponent(FlatList);

const Favorites: React.ForwardRefRenderFunction<
  FlatList<RadioType>,
  FavoritesProps
> = ({ refreshTranslateY }, ref) => {
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
      onEndReachedThreshold={4}
      onScrollEndDrag={() => refreshTranslateY('favorites')}
    />
  );
};

export default forwardRef(Favorites);
