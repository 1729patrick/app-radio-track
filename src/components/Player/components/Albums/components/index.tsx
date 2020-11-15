import React, { memo } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Radio } from '~/components/Radios';

import styles from './styles';

type AlbumsProps = {
  item: Radio;
};

const Album: React.FC<AlbumsProps> = ({ item }) => {
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
