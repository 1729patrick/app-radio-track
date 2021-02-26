import React, { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RectButton as NativeRectButton } from 'react-native-gesture-handler';
import getStyles from './styles';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type RectButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  titleStyle?: object;
  loading?: boolean;
};

const RectButton = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
  loading,
}: RectButtonProps) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <NativeRectButton
        onPress={onPress}
        style={styles.button}
        rippleColor={palette.secondary}>
        {!loading && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        {loading && <ActivityIndicator color={palette.primary} size={35} />}
      </NativeRectButton>
    </View>
  );
};

export default memo(RectButton);
