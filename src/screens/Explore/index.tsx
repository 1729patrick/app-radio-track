import React, { useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Radios, { Radios as RadiosTpe } from '~/components/Radios';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';
import { colors } from '~/utils/Colors';

import radios from '~/services/radios.js';
import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';

const Explore: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();

  const { onOpenPlayer } = usePlayer();

  const stations = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  const onShowAll = () => {};

  return (
    <View style={styles.container}>
      <Header translateY={translateY} />

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Radios
          title="Santa Catarina"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
          showAll
          onShowAll={onShowAll}
        />
        <Radios
          title="Rio Grande do Sul"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
          showAll
          onShowAll={onShowAll}
        />
        <Radios
          title="Paraná"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
          showAll
          onShowAll={onShowAll}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default Explore;
