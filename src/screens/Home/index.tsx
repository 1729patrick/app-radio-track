import React, { useRef } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

import styles from './styles';
import Radios from '~/components/Radios';

const radios = [
  {
    title_song: 'Fasten seat belt',
    artist_song: 'Space',
    radio_name:
      '\u0420\u0430\u0434\u0438\u043e \u0410\u043b\u044c\u0444\u0430 (radio Alfa)',
    radio_id: '25794',
    radio_stream: 'http://online.alfafm.ru:8000/alfa_mp3',
    radio_logo:
      '\u0420\u0430\u0434\u0438\u043e-\u0410\u043b\u044c\u0444\u0430-(radio-alfa).jpg',
    date: '2020-11-03 00:56:39',
  },
  {
    title_song: 'My way soon',
    artist_song: 'Greta van fleet',
    radio_name: '100 XR Rock Radio',
    radio_id: '1789',
    radio_stream: 'http://stream.100xr.com/;stream.mp3',
    radio_logo: '100-xr-rock-radio.jpg',
    date: '2020-11-03 00:55:05',
  },
  {
    title_song: 'We&acute;re still alive',
    artist_song: 'The tame and the wild',
    radio_name: 'Eldoradio',
    radio_id: '20991',
    radio_stream: 'http://sc-eldolive.newmedia.lu',
    radio_logo: 'eldoradio.jpg',
    date: '2020-11-03 00:54:02',
  },
  {
    title_song: 'In your eyes',
    artist_song: 'The weeknd',
    radio_name: '40 Principales 93.9 FM',
    radio_id: '14342',
    radio_stream:
      'http://playerservices.streamtheworld.com/api/livestream-redirect/LOS40.mp3\r',
    radio_logo: '40-principales-93-9-fm.jpg',
    date: '2020-11-03 00:53:25',
  },
  {
    title_song: 'Mi religi\u00f3n',
    artist_song: 'Nil moliner',
    radio_name: 'Cadena 100',
    radio_id: '14423',
    radio_stream:
      'http://cadena100-streamers-mp3-low.flumotion.com/cope/cadena100.mp3',
    radio_logo: 'cadena-100.jpg',
    date: '2020-11-03 00:53:21',
  },
  {
    title_song:
      'If you`re gonna play in texas (you gotta have a fiddle in the band) ',
    artist_song: 'Alabama',
    radio_name: 'Highway 181 Country',
    radio_id: '2800',
    radio_stream: 'http://relay.181.fm:8018/',
    radio_logo: 'highway-181-country.jpg',
    date: '2020-11-03 00:53:17',
  },
];
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
          radios={radios}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={radios}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={radios}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios populares"
          radios={radios}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios recomendadas"
          radios={radios}
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
