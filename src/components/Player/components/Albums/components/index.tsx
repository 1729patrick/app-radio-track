import React, { memo } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';

import styles from './styles';

const Album = ({ item }) => {
  return (
    <View style={[styles.card]}>
      <FastImage
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.center}
        source={{
          uri: item.favicon,
        }}
      />
    </View>
  );
};

export default memo(Album);
