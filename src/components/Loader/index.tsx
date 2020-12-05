import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';
import styles from './styles';

//@ts-ignore
const size = Platform.select({ ios: 'large', android: 50 });

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={StyleGuide.palette.primary} size={size} />
    </View>
  );
};

export default Loader;
