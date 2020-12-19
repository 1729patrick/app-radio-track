import React, { memo } from 'react';
import { View, Image } from 'react-native';

import { image } from '~/services/api';
import { RadioType } from '~/types/Station';

import styles from './styles';

type AlbumsProps = {
  item?: RadioType;
  error?: boolean;
};

const Album: React.FC<AlbumsProps> = ({ item, error }) => {
  return (
    <View style={[styles.card]}>
      <Image
        style={styles.image}
        source={{
          uri: image(item?.img),
        }}
      />
      {/* {error && (
        <View style={[styles.notFoundContainer]}>
          <LottieView
            source={require('~/assets/radio_not_found.json')}
            autoPlay
            loop
            style={styles.notFound}
          />
          <Text style={styles.notFoundTitle}>🚨 Rádio fora do ar 🚨</Text>
        </View>
      )} */}
    </View>
  );
};

export default memo(Album);
