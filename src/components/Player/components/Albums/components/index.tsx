import React, { memo } from 'react';
import { View, Text } from 'react-native';

import FastImage from 'react-native-fast-image';
import { image } from '~/services/api';
import { RadioType } from '~/types/Station';
import LottieView from 'lottie-react-native';

import styles from './styles';

type AlbumsProps = {
  item: RadioType;
  error?: boolean;
};

const Album: React.FC<AlbumsProps> = ({ item, error }) => {
  return (
    <View style={[styles.card]}>
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: image(item.img),
          priority: FastImage.priority.high,
        }}
      />
      {error && (
        <View style={[styles.notFoundContainer]}>
          <LottieView
            source={require('~/assets/radio_not_found.json')}
            autoPlay
            loop
            style={styles.notFound}
          />
          <Text style={styles.notFoundTitle}>🚨 Rádio fora do ar 🚨</Text>
        </View>
      )}
    </View>
  );
};

export default memo(Album);
