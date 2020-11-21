import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import { Radios as RadiosTpe } from '~/components/Radios';

import Header from '~/components/Header';
import { colors } from '~/utils/Colors';

import radios from '~/services/radios.js';
import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { RouteProp, useRoute } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import { FlatList } from 'react-native-gesture-handler';
import Radio from './components/Radio';

type RootStackParamList = {
  Playlist: { title: string };
};

type RouteProps = RouteProp<RootStackParamList, 'Playlist'>;

const Explore: React.FC = () => {
  const { translateY } = useAnimatedHeader();
  const { params } = useRoute<RouteProps>();

  const { onOpenPlayer } = usePlayer();

  const radios_ = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio
          item={item}
          index={index}
          onOpenPlayer={({ radioIndex }) =>
            onOpenPlayer({ title: params?.title, radios: radios_, radioIndex })
          }
        />
      );
    },
    [onOpenPlayer, params?.title, radios_],
  );

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={params?.title}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={25}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={radios_}
        keyExtractor={({ stationuuid }) => `${stationuuid}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Explore;
