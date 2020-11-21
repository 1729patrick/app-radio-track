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

const Home: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();

  const { onOpenPlayer } = usePlayer();

  const stations = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Radios
          title="Ouvidas recentemente"
          radios={[
            stations[0],
            stations[1],
            stations[2],
            stations[3],
            stations[4],
          ]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={[stations[5], stations[6], stations[7]]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios populares"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios recomendadas"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
