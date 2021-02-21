import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { RectButton as NativeRectButton } from 'react-native-gesture-handler';
import getStyles from './styles';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

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
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <NativeRectButton
        onPress={onPress}
        style={styles.button}
        rippleColor={palette.secondary}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </NativeRectButton>
    </View>
  );
};

export default memo(RectButton);
