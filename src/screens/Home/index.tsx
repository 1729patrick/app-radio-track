import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';
import ImageColors from 'react-native-image-colors';

import { darken, getContrast } from 'polished';
import styles from './styles';
import Radios from '~/components/Radios';

import radios from './radios';

const Home = () => {
  const [working, setWorking] = useState([]);

  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  const xxxx = async () => {
    const working_ = await Promise.all(
      [radios[4], radios[2], radios[3], radios[5], radios[6], radios[7]].map(
        async (radio) => {
          const radio_logo = `https://www.radioair.info/images_radios/${radio.radio_logo}`;

          const colors = await ImageColors.getColors(radio_logo);

          const contrastRatio1 = getContrast(
            darken(0.2, colors.dominant),
            '#fff',
          );
          const contrastRatio2 = getContrast(
            darken(0.2, colors.dominant),
            '#000',
          );

          console.log({ contrastRatio1, contrastRatio2 });
          return {
            ...radio,
            radio_logo,
            color: darken(0.2, colors.dominant),
          };
        },
      ),
    );

    setWorking(working_);
  };

  useEffect(() => {
    xxxx();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Radios
          title="Ouvidas recentemente"
          radios={[
            radios[0],
            radios[31],

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
          radios={working}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={[radios[32]]}
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
