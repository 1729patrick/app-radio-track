import React, { memo } from 'react';

import Animated from 'react-native-reanimated';

import { image } from '~/services/api';
import { RadioType } from '~/types/Station';

import styles from './styles';

type AlbumsProps = {
  item?: RadioType;
};

const Album: React.FC<AlbumsProps> = ({ item }) => {
  return (
    <Animated.View style={[styles.card]}>
      <Animated.Image
        style={[styles.image]}
        source={{
          uri: image(item?.img),
        }}
      />
    </Animated.View>
  );
};

export default memo(Album);
