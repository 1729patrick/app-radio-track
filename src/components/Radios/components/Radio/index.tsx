import React, { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';
import { RadioType } from '~/types/Station';
import { image } from '~/services/api';

type RadioProps = {
  item: RadioType;
  index: number;
  onExpandPlayer: (args: { radioIndex: number }) => void;
};

const Radio: React.FC<RadioProps> = ({ item, index, onExpandPlayer }) => {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => onExpandPlayer({ radioIndex: index })}
        hitSlop={{ top: 0, bottom: 500, left: 0, right: 0 }}
        style={styles.button}
        activeOpacity={0.4}>
        <FastImage
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: image(item.img),
          }}
        />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {item.slogan}
      </Text>
    </View>
  );
};

export default memo(Radio);
