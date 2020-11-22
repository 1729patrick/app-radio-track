import React, { useCallback } from 'react';
import { View } from 'react-native';

import styles from './styles';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { RouteProp, useRoute } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import { FlatList } from 'react-native-gesture-handler';
import Radio from './components/Radio';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Loader from '~/components/Loader';

type RootStackParamList = {
  Playlist: { title: string; id: string[] };
};

type RouteProps = RouteProp<RootStackParamList, 'Playlist'>;

const Explore: React.FC = () => {
  const { translateY } = useAnimatedHeader();
  const { params } = useRoute<RouteProps>();

  const { data, fetchMore } = useFetchPagination(
    `genres/${JSON.stringify(params.id)}`,
  );

  const { onOpenPlayer } = usePlayer();

  const onOpenPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      onOpenPlayer({
        title: params.title,
        radios: data?.items || [],
        radioIndex,
      });
    },
    [data?.items, onOpenPlayer, params.title],
  );

  console.log(params.title, data?.totalItems, data?.items.length, data?.page);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio item={item} index={index} onOpenPlayer={onOpenPlayerPress} />
      );
    },
    [onOpenPlayerPress],
  );

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={params?.title}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />

      {!data && <Loader />}

      {data && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
          initialNumToRender={24}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={data?.items}
          keyExtractor={({ id }) => `${id}`}
          renderItem={renderItem}
          onEndReachedThreshold={2}
          onEndReached={fetchMore}
        />
      )}
    </View>
  );
};

export default Explore;
