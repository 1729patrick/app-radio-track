import React, { memo } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { image } from '~/services/api';
import { RadioType } from '~/types/Station';

import styles from './styles';

type AlbumsProps = {
  item: RadioType;
};

const Album: React.FC<AlbumsProps> = ({ item }) => {
  return (
    <View style={[styles.card]}>
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: image(item.img),
        }}
      />
    </View>
  );
};

export default memo(Album);
