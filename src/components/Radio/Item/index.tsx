import React, { memo, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

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
  const onRadioPress = useCallback(() => {
    onExpandPlayer({ radioIndex: index });
  }, [index, onExpandPlayer]);

  return (
    <RectButton
      style={[
        styles.container,
        { backgroundColor: playing ? StyleGuide.palette.border : undefined },
      ]}
      rippleColor={StyleGuide.palette.secondary}
      onPress={onRadioPress}>
      <Image
        style={styles.image}
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
