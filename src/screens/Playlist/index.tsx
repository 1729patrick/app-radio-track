import React, { useCallback } from 'react';
import { View } from 'react-native';

import styles from './styles';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { RouteProp, useRoute } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import { FlatList } from 'react-native-gesture-handler';
import Radio from '~/components/Radio/Item';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Loader from '~/components/Loader';
import Error from '~/components/Error';

type RootStackParamList = {
  Playlist: { title: string; url: string; initialPage?: number };
};

type RouteProps = RouteProp<RootStackParamList, 'Playlist'>;

const Explore: React.FC = () => {
  const { translateY } = useAnimatedHeader();
  const { params } = useRoute<RouteProps>();

  const { data, error, fetchMore } = useFetchPagination(
    params.url,
    params.initialPage,
  );

  const { onExpandPlayer } = usePlayer();

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      onExpandPlayer({
        title: params.title,
        radios: data?.items || [],
        radioIndex,
      });
    },
    [data?.items, onExpandPlayer, params.title],
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
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={params?.title}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />

      {!data && !error && <Loader />}
      {error && <Error type={error?.message} />}

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
          onEndReachedThreshold={3}
          onEndReached={fetchMore}
        />
      )}
    </View>
  );
};

export default Explore;
