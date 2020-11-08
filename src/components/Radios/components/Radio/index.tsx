import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

const Radio: React.FC<{}> = ({ item, index, onOpenRadio }) => {
  return (
    <TouchableOpacity onPress={() => onOpenRadio({ radioIndex: index })}>
      <View style={[styles.card]}>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://www.radioair.info/images_radios/${item.radio_logo}`,
          }}
        />

        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.artist_song}
        </Text>
        <Text style={styles.cardDescription}>{item.radio_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Radio);
