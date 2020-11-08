import React, { memo } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

const Radio: React.FC<{}> = ({ item, index, onOpenRadio }) => {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => onOpenRadio({ radioIndex: index })}
        hitSlop={{ top: 0, bottom: 500, left: 0, right: 0 }}
        activeOpacity={0.5}
        style={{ zIndex: 1 }}>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://www.radioair.info/images_radios/${item.radio_logo}`,
          }}
        />
      </TouchableOpacity>

      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.artist_song}
      </Text>
      <Text style={styles.cardDescription}>{item.radio_name}</Text>
    </View>
  );
};

export default memo(Radio);
