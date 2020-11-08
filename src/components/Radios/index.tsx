import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PlayerState } from '../Player';
import styles from './styles';

import Radio from './components/Radio';

export type Radios = {
  title_song: string;
  artist_song: string;
  radio_name: string;
  radio_id: string;
  radio_stream: string;
  radio_logo: string;
  date: string;
}[];

type RadiosProps = {
  title: string;
  onOpenRadio: (args: PlayerState) => void;
  radios: Radios;
};

const Radios: React.FC<RadiosProps> = ({ title, radios, onOpenRadio }) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio
          item={item}
          index={index}
          onOpenRadio={({ radioIndex }) =>
            onOpenRadio({ title, radios, radioIndex })
          }
        />
      );
    },
    [onOpenRadio, radios, title],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={3}
        horizontal
        data={radios}
        keyExtractor={({ title_song }) => `${title_song}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Radios;
