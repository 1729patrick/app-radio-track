import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import Loader from '~/components/Loader';

import {
  FavoriteRadios,
  FindOutRadios,
  LocationRadios,
  PopularRadios,
  RecommendRadios,
} from '~/components/Radios/types';

const Home: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();
  const [loadings, setLoadings] = useState({});

  const { onExpandPlayer } = usePlayer();

  const isLoading = useMemo(() => {
    return Object.values(loadings).some((loading) => !loading);
  }, [loadings]);

  const toggleLoading = useCallback(
    ({ key, value }: { key: string; value: boolean }) => {
      setLoadings((l) => {
        if (l[key]) {
          return l;
        }

        return { ...l, [key]: value };
      });
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />

      {isLoading && <Loader />}

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
          onExpandPlayer={onExpandPlayer}
        /> */}
        <FavoriteRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
        <RecommendRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
        <PopularRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
        <LocationRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
        <FindOutRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
