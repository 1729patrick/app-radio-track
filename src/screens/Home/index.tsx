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
          radios={[
            radios[0],
            radios[31],
            radios[32],
            radios[33],
            radios[34],
            radios[35],
            radios[37],
            radios[38],
            radios[39],
            radios[40],
          ]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={[radios[1], radios[2], radios[3]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={[radios[4], radios[5], radios[6], radios[7]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios populares"
          radios={[radios[8], radios[9], radios[10], radios[11], radios[12]]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios recomendadas"
          radios={[
            radios[13],
            radios[14],
            radios[15],
            radios[17],
            radios[18],
            radios[19],
            radios[20],
          ]}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={[
            radios[21],
            radios[22],
            radios[23],
            radios[24],
            radios[25],
            radios[27],
            radios[28],
            radios[29],
            radios[30],
          ]}
          onOpenRadio={onOpenRadio}
        />
      </ScrollView>
      <Player ref={playerRef} />
    </View>
  );
};

export default Home;
