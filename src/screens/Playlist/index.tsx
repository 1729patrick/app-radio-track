import React, { memo, useCallback, useEffect } from 'react';
import { View } from 'react-native';

import getStyles from './styles';

import Header from '~/components/Header';

import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { RouteProp, useRoute } from '@react-navigation/native';

import { FlatList } from 'react-native-gesture-handler';
import Radio from '~/components/Radio/Item';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Loader from '~/components/Loader';
import Error from '~/components/Error';
import { useAd } from '~/ads/contexts/AdContext';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import { usePlaying } from '~/contexts/PlayingContext';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type RootStackParamList = {
  Playlist: {
    title: string;
    url: string;
    initialPage?: number;
  };
};

type RouteProps = RouteProp<RootStackParamList, 'Playlist'>;

const Explore: React.FC = () => {
  const { translateY } = useAnimatedHeader();
  const { params } = useRoute<RouteProps>();
  const { showPlaylistAd } = useAd();
  const { playingRadioId } = usePlaying();
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

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
        <>
          <Radio
            item={item}
            index={index}
            onExpandPlayer={onExpandPlayerPress}
            playing={playingRadioId === item.id}
          />

          {!index && (
            <Banner
              id={BLOCKS.MUSIC}
              backgroundColor={palette.backgroundSecondary}
            />
          )}
        </>
      );
    },
    [onExpandPlayerPress, palette.backgroundSecondary, playingRadioId],
  );

  useEffect(() => {
    showPlaylistAd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={params?.title}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
      />

      {!data && !error && <Loader />}
      {!data && !!error && <Error type={error?.message} />}

      {data && (
        <FlatList
          showsHorizontalScrollIndicator={false}
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

export default memo(Explore);
