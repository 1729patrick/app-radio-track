import { lighten } from 'polished';
import React from 'react';
import { Text, View } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton as NativeRectButton } from 'react-native-gesture-handler';
import styles from './styles';

type RectButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  titleStyle?: object;
};

const RectButton = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
}: RectButtonProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <NativeRectButton
        onPress={onPress}
        style={styles.button}
        rippleColor={StyleGuide.palette.border}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </NativeRectButton>
    </View>
  );
};

export default RectButton;
