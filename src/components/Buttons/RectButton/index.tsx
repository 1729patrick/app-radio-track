import { lighten } from 'polished';
import React from 'react';
import { Text, View } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton as NativeRectButton } from 'react-native-gesture-handler';
import styles from './styles';

type RectButtonProps = {
  title: string;
  onPress: () => void;
};

const RectButton = ({ title, onPress }: RectButtonProps) => {
  return (
    <View style={styles.container}>
      <NativeRectButton
        onPress={onPress}
        style={styles.button}
        rippleColor={StyleGuide.palette.border}>
        <Text style={styles.title}>{title}</Text>
      </NativeRectButton>
    </View>
  );
};

export default RectButton;
