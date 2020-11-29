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
  PlaylistRadios,
  PopularRadios,
} from './components/Radios/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Error from '~/components/Error';

const PLAYLISTS = [
  {
    key: 'recommend',
    url: 'playlists/recommend',
    title: 'Rádios recomendadas',
    initialPage: new Date().getDate() + 5,
  },
  {
    key: 'popular',
    url: 'playlists/popular',
    title: 'Rádios populares',
  },
  {
    key: 'location',
    url: 'playlists/location',
    title: 'Rádios da sua região',
    initialPage: new Date().getDate() + 10,
  },
  {
    key: 'random',
    url: 'playlists/random',
    title: 'Descubra novas rádios',
    initialPage: new Date().getDate() + 15,
  },
];

type StateType = {
  recommend?: { success: boolean; error: string };
  popular?: { success: boolean; error: string };
  location?: { success: boolean; error: string };
  random?: { success: boolean; error: string };
};

const Home: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();
  const [state, setState] = useState<StateType>({});
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const { onExpandPlayer } = usePlayer();

  const isLoading = useMemo(() => {
    if (!Object.values(state).length) {
      return true;
    }

    return Object.values(state).some(({ success, error }) => {
      return !success && !error;
    });
  }, [state]);

  const isError = useMemo(() => {
    if (!Object.values(state).length) {
      return false;
    }

    return Object.values(state).every(({ success, error }) => {
      return !success && error;
    });
  }, [state]);

  const toggleState = useCallback(
    (args: { key: string; success: boolean; error: string }) => {
      const { key, success, error } = args;

      setState((l) => {
        return { ...l, [key]: { success, error } };
      });
    },
    [],
  );

  const onShowPlaylist = (args: {
    title: string;
    url: string;
    initialPage: number;
  }) => {
    navigate('Playlist', args);
  };

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />

      {isLoading && <Loader />}
      {isError && <Error type={state.popular?.error} />}

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <FavoriteRadios onExpandPlayer={onExpandPlayer} />

        {PLAYLISTS.map((playlist) => (
          <PlaylistRadios
            key={playlist.key}
            playlist={playlist}
            onExpandPlayer={onExpandPlayer}
            toggleState={toggleState}
            showAll
            onShowAll={onShowPlaylist}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
