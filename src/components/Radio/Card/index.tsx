import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';

import FastImage from 'react-native-fast-image';
import { RadioType } from '~/types/Station';
import { image } from '~/services/api';

type RadioProps = {
  playing: boolean;
  item: RadioType;
  index: number;
  onExpandPlayer: (args: { radioIndex: number }) => void;
};

const Radio: React.FC<RadioProps> = ({
  playing,
  item,
  index,
  onExpandPlayer,
}) => {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => onExpandPlayer({ radioIndex: index })}
        hitSlop={{ top: 0, bottom: 50, left: 0, right: 0 }}
        style={styles.button}
        activeOpacity={0.4}>
        <FastImage
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: image(item.img),
          }}
        />
        {playing && (
          <View style={styles.playingContainer}>
            <LottieView
              source={require('~/assets/playing.json')}
              autoPlay
              loop
              style={styles.playing}
              speed={1}
            />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {item.slogan || item.city?.name}
      </Text>
    </View>
  );
};

export default Radio;
