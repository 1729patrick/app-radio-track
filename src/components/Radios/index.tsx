import React from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { PlayerState } from '../Player';
import styles from './styles';

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        decelerationRate={'fast'}
        horizontal
        data={radios}
        keyExtractor={({ radio_id }) => `${radio_id}`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => onOpenRadio({ title, radios, radioIndex: index })}>
              <View style={[styles.card]}>
                <View style={styles.cardImage} />

                <Text style={styles.cardTitle}>{item.artist_song}</Text>
                <Text style={styles.cardDescription}>{item.radio_name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Radios;
