import React, { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';
type RadioProps = {
  item: any;
  index: number;
  onOpenPlayer: (args: { radioIndex: number }) => void;
};

const Radio: React.FC<RadioProps> = ({ item, index, onOpenPlayer }) => {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => onOpenPlayer({ radioIndex: index })}
        hitSlop={{ top: 0, bottom: 500, left: 0, right: 0 }}
        style={styles.button}>
        <FastImage
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.center}
          source={{
            uri: item.favicon,
          }}
        />
      </TouchableOpacity>

      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.name}
      </Text>
      {/* <Text style={styles.cardDescription} numberOfLines={1}>
        {item.tags}
      </Text> */}
    </View>
  );
};

export default memo(Radio);
