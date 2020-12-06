import React, { useCallback, forwardRef, useMemo } from 'react';
import { useFavorites } from '~/contexts/FavoriteContext';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/components/Radio/Item';

import styles from './styles';
import { RadioType } from '~/types/Station';
import { FlatList } from 'react-native-gesture-handler';
import Error from '~/components/Error';
import { BLOCKS } from '~/ads/constants';
import Banner from '~/ads/components/Banner';
import { usePlaying } from '~/contexts/PlayingContext';

type FavoritesProps = {
  refreshTranslateY: (from: string) => void;
};

const Favorites: React.ForwardRefRenderFunction<
  FlatList<RadioType>,
  FavoritesProps
> = ({ refreshTranslateY }, ref) => {
  const { onExpandPlayer } = usePlayer();
  const { favorites } = useFavorites();
  const { playingRadioId } = usePlaying();
  const randomAdIndex = useMemo(() => {
    const randomIndex = (Math.random() * 12).toFixed(0);

    return +randomIndex;
  }, []);

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
        <>
          <Radio
            playing={playingRadioId === item.id}
            item={item}
            index={index}
            onExpandPlayer={onExpandPlayerPress}
          />
          {index === randomAdIndex && <Banner id={BLOCKS.MUSIC} />}
        </>
      );
    },
    [onExpandPlayerPress, playingRadioId, randomAdIndex],
  );

  if (!favorites.length) {
    return <Error type="favoritesEmpty" />;
  }

  return (
    <FlatList
      ref={ref}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={12}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      data={favorites}
      keyExtractor={({ id }) => `${id}`}
      renderItem={renderItem}
      onEndReachedThreshold={3}
      onScrollEndDrag={() => refreshTranslateY('favorites')}
    />
  );
};

export default forwardRef(Favorites);
