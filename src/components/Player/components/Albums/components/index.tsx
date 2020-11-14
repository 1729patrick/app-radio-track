import React, { memo } from 'react';
import { Image, View } from 'react-native';

import styles from './styles';

const Album = ({ item }) => {
  return (
    <View style={[styles.card]}>
      <Image
        style={styles.cardImage}
        source={{
          uri: item.radio_logo,
        }}
      />
    </View>
  );
};

export default memo(Album);
