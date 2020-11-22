import React, { useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Radios from '~/components/Radios';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import Loader from '~/components/Loader';

import { useFetchPagination } from '~/hooks/useFetchPagination';

const Home: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();

  const recommend = useFetchPagination('playlists/recommend', true);
  const popular = useFetchPagination('playlists/popular');
  const location = useFetchPagination('playlists/location', true);
  const random = useFetchPagination('playlists/random', true);

  const { onOpenPlayer } = usePlayer();

  const isLoading = useMemo(() => {
    return !recommend.data || !popular.data || !location.data || !random.data;
  }, [location.data, popular.data, random.data, recommend.data]);

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />

      {isLoading && <Loader />}

      {!isLoading && (
        <Animated.ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          {/* <Radios
          title="Ouvidas recentemente"
          radios={[
            stations[0],
            stations[1],
            stations[2],
            stations[3],
            stations[4],
          ]}
          onOpenPlayer={onOpenPlayer}
        /> */}
          {/* <Radios
          title="Suas rádios favoritas"
          radios={[stations[5], stations[6], stations[7]]}
          onOpenPlayer={onOpenPlayer}
        /> */}
          <Radios
            title="Rádios recomendadas"
            radios={recommend.data?.items}
            onOpenPlayer={onOpenPlayer}
            onEndReached={recommend.fetchMore}
          />
          <Radios
            title="Rádios populares"
            radios={popular.data?.items}
            onOpenPlayer={onOpenPlayer}
            onEndReached={popular.fetchMore}
          />
          <Radios
            title="Rádios da sua região"
            radios={location.data?.items}
            onOpenPlayer={onOpenPlayer}
            onEndReached={location.fetchMore}
          />
          <Radios
            title="Descubra novas rádios"
            radios={random.data?.items}
            onOpenPlayer={onOpenPlayer}
            onEndReached={random.fetchMore}
          />
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default Home;
