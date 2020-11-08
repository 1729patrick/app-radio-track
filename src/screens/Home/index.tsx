import React, { useRef } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

import styles from './styles';
import Radios from '~/components/Radios';

import radios from './radios';

const Home = () => {
  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Radios
          title="Ouvidas recentemente"
          radios={[radios[0]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={[radios[1], radios[2], radios[3]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={[radios[1], radios[2], radios[3], radios[4]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios populares"
          radios={[radios[1], radios[2], radios[3], radios[4], radios[5]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios recomendadas"
          radios={[
            radios[1],
            radios[2],
            radios[3],
            radios[4],
            radios[5],
            radios[7],
          ]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={radios}
          onOpenRadio={onOpenRadio}
        />
      </ScrollView>
      <Player ref={playerRef} />
    </View>
  );
};

export default Home;
