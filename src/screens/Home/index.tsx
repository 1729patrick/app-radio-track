import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';
import ImageColors from 'react-native-image-colors';

import styles from './styles';
import Radios from '~/components/Radios';

import radios, { playlist } from './radios';
import { colors, getSimilar } from '~/utils/Colors';

const Home = () => {
  const [working, setWorking] = useState([]);
  const [rest, setRest] = useState([]);

  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  const getWorking = async () => {
    const working_ = await Promise.all(
      playlist.map(async (radio) => {
        const radio_logo = `https://www.radioair.info/images_radios/${radio.radio_logo}`;

        const { vibrant, primary, background } = await ImageColors.getColors(
          radio_logo,
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
          radio_logo,
          color,
        };
      }),
    );

    setWorking(working_);
  };

  const getRest = async () => {
    const rest_ = await Promise.all(
      radios.map(async (radio) => {
        const radio_logo = `https://www.radioair.info/images_radios/${radio.radio_logo}`;

        const { vibrant } = await ImageColors.getColors(radio_logo);

        const contrasts = colors.reduce((acc, color) => {
          const contrast = getSimilar(color, vibrant);
          return { ...acc, [contrast]: color };
        }, {});

        const minContrast = Math.max(...Object.keys(contrasts));

        const color = contrasts[minContrast];

        return {
          ...radio,
          radio_logo,
          color,
        };
      }),
    );

    setRest(rest_);
  };

  useEffect(() => {
    getWorking();
    // getRest();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Radios
          title="Ouvidas recentemente"
          radios={rest}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={working}
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
