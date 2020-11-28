import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
} from './components/Radios/types';
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Home: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();
  const [loadings, setLoadings] = useState({});
  const { navigate } = useNavigation<StackNavigationProp<{}>>();

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

  const onShowPlaylist = ({ title, url }: { title: string; url: string }) => {
    navigate('Playlist', { title, url });
  };

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />

      {isLoading && <Loader />}

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <FavoriteRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
        />
        <RecommendRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
          showAll
          onShowAll={onShowPlaylist}
        />
        <PopularRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
          onShowAll={onShowPlaylist}
          showAll
          onShowAll={onShowPlaylist}
        />
        <LocationRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
          onShowAll={onShowPlaylist}
          showAll
          onShowAll={onShowPlaylist}
        />
        <FindOutRadios
          onExpandPlayer={onExpandPlayer}
          toggleLoading={toggleLoading}
          onShowAll={onShowPlaylist}
          showAll
          onShowAll={onShowPlaylist}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
