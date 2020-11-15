import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';
import ImageColors from 'react-native-image-colors';

import styles from './styles';
import Radios from '~/components/Radios';

import radios from './radios';
import { colors, getSimilar } from '~/utils/Colors';
import stations from '~/services/stations';

const Home = () => {
  const [stations, setStations] = useState([]);

  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  const getWorking = async () => {
    const stations = await Promise.all(
      radios.map(async (radio) => {
        return { ...radio, color: colors[0] };

        try {
          const { vibrant, primary, background } = await ImageColors.getColors(
            radio.favicon,
            {},
          );

          const contrasts = colors.reduce((acc, color) => {
            const colorImage =
              vibrant || (primary === '#FFFFFF' ? background : primary);

            const contrast = getSimilar(color, colorImage);
            return { ...acc, [contrast]: color };
          }, {});

          const minContrast = Math.max(...Object.keys(contrasts));

          const color = contrasts[minContrast];

          return {
            ...radio,
            color,
          };
        } catch (err) {
          return { ...radio, color: colors[0] };
        }
      }),
    );

    setStations(stations);
  };

  useEffect(() => {
    getWorking();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Radios
          title="Ouvidas recentemente"
          radios={rest}
          onOpenRadio={onOpenRadio}
        /> */}
        <Radios
          title="Suas rádios favoritas"
          radios={stations}
          onOpenRadio={onOpenRadio}
        />
        {/* <Radios
          title="Descubra uma nova rádio"
          radios={[radios[32]]}
          onOpenRadio={onOpenRadio}
        /> */}
        {/* <Radios
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
        /> */}
      </ScrollView>
      <Player ref={playerRef} />
    </View>
  );
};

export default Home;
