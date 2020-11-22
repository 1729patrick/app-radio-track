import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';

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

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio
          item={item}
          index={index}
          onOpenPlayer={({ radioIndex }) =>
            onOpenPlayer({ title: params?.title, radios: [], radioIndex })
          }
        />
      );
    },
    [onOpenPlayer, params?.title],
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
        data={[]}
        keyExtractor={({ id }) => `${id}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Explore;
