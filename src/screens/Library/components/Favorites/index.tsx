import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useFavorites } from '~/contexts/FavoriteContext';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/screens/Playlist/components/Radio';

import styles from './styles';

Animated.FlatList = Animated.createAnimatedComponent(FlatList);

import useAnimatedHeader from '~/hooks/useAnimatedHeader';

type FavoritesProps = {
  translateY: Animated.SharedValue<number>;
};

const Favorites: React.FC<FavoritesProps> = ({ translateY }) => {
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
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={24}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={favorites}
      keyExtractor={({ id }) => `${id}`}
      renderItem={renderItem}
      onScroll={scrollHandler}
      onEndReachedThreshold={4}
    />
  );
};

export default Favorites;
