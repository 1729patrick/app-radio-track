import React, { memo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton } from 'react-native-gesture-handler';
import RoundButton from '~/components/Button/Round';
import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/Ionicons';
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
  const onRadioPress = () => {
    onExpandPlayer({ radioIndex: index });
  };

  return (
    <RectButton
      style={styles.container}
      rippleColor={StyleGuide.palette.secondary}
      onPress={onRadioPress}>
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: image(item.img),
        }}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.description} numberOfLines={1}>
          {item.slogan || item.city?.name}
        </Text>
      </View>

      {playing ? (
        <LottieView
          source={require('~/assets/playing.json')}
          autoPlay
          loop
          style={styles.playing}
          speed={1}
        />
      ) : (
        <RoundButton
          Icon={Icon}
          name="ios-play-circle-outline"
          size={27}
          onPress={onRadioPress}
        />
      )}
    </RectButton>
  );
};

export default memo(Radio);
