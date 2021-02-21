import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useTheme } from '~/contexts/ThemeContext';
import styles from './styles';

//@ts-ignore
const size = Platform.select({ ios: 'large', android: 45 });

type LoaderProps = { backgroundColor?: string };

const Loader: React.FC<LoaderProps> = ({ backgroundColor }) => {
  const { palette } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || palette.background },
      ]}>
      <ActivityIndicator color={palette.app} size={size} />
    </View>
  );
};

export default Loader;
