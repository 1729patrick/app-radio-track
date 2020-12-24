import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';

import styles from './styles';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import Loader from '~/components/Loader';

import { FavoriteRadios, PlaylistRadios } from './components/Radios/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Error from '~/components/Error';
import Input from '~/components/Input';
import { useRegion } from '~/contexts/RegionContext';

function daysIntoYear() {
  const date = new Date();
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

const dateOfYear = daysIntoYear();

const PLAYLISTS = [
  {
    key: 'recommend',
    url: 'playlists/recommend',
    title: 'Rádios recomendadas',
    initialPage: (dateOfYear + 10) % 228,
  },
  {
    key: 'news',
    url: 'genres/["gvfajea1","i59vt6nq","rdqj0603","se14b6m5"]',
    title: 'Acompanhe as notícias',
    initialPage: dateOfYear % 16,
    initialPageAllList: 1,
  },
  {
    key: 'sports',
    url: 'genres/["iq5fvulg"]',
    title: 'Tudo sobre esportes',
    initialPage: dateOfYear % 9,
    initialPageAllList: 1,
  },
  {
    key: 'popular',
    url: 'playlists/popular',
    title: 'Rádios populares',
    initialPage: (dateOfYear + 20) % 228,
  },
  {
    key: 'location',
    url: 'playlists/region/br/',
    title: 'Rádios da sua região',
    initialPage: 1,
  },
  {
    key: 'random',
    url: 'playlists/random',
    title: 'Descubra novas rádios',
    initialPage: (dateOfYear + 30) % 228,
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
  const { STATES, regionId } = useRegion();
  const [state, setState] = useState<StateType>({});
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const welcomeShowedRef = useRef(false);
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

      if (key === 'location') {
        return;
      }

      setState((l) => {
        return { ...l, [key]: { success, error } };
      });
    },
    [],
  );

  const onShowPlaylist = useCallback(
    (args: {
      title: string;
      url: string;
      initialPage?: number;
      adType: string;
    }) => {
      navigate('Playlist', args);
    },
    [navigate],
  );

  useEffect(() => {
    if (welcomeShowedRef.current || !regionId) {
      return;
    }
    welcomeShowedRef.current = true;

    if (regionId === STATES.EMPTY) {
      navigate('Welcome');
    }
  }, [STATES.EMPTY, navigate, regionId]);

  if (regionId === STATES.EMPTY) {
    return <Loader />;
  }

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
        {!isError && <FavoriteRadios onExpandPlayer={onExpandPlayer} />}
        {PLAYLISTS.map((playlist) => (
          <PlaylistRadios
            key={playlist.key}
            playlist={playlist}
            onExpandPlayer={onExpandPlayer}
            toggleState={toggleState}
            showAll
            onShowAll={onShowPlaylist}
            param={playlist.key === 'location' ? regionId : ''}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default memo(Home);
