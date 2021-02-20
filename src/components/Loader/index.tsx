import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import styles from './styles';

//@ts-ignore
const size = Platform.select({ ios: 'large', android: 45 });

type LoaderProps = { backgroundColor?: string };

const Loader: React.FC<LoaderProps> = ({
  backgroundColor = StyleGuide.palette.background,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator color={StyleGuide.palette.app} size={size} />
    </View>
  );
};

export default Loader;
