import React, { memo } from 'react';
import { Text } from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton } from 'react-native-gesture-handler';
import RoundButton from '~/components/Button/Round';

import Icon from 'react-native-vector-icons/Ionicons';

type RadioProps = {
  item: any;
  index: number;
  onOpenPlayer: (args: { radioIndex: number }) => void;
};

const Radio: React.FC<RadioProps> = ({ item, index, onOpenPlayer }) => {
  const onRadioPress = () => {
    onOpenPlayer({ radioIndex: index });
  };

  return (
    <RectButton
      style={styles.container}
      rippleColor={StyleGuide.palette.secondary}
      onPress={onRadioPress}>
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.center}
        source={{
          uri: item.favicon,
        }}
      />

      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>

      <RoundButton
        Icon={Icon}
        name="ios-play-circle-outline"
        size={27}
        onPress={onRadioPress}
      />
    </RectButton>
  );
};

export default memo(Radio);
