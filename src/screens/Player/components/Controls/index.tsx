import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const Controls = () => {
  return (
    <View style={[styles.container]}>
      <Icon name="play-skip-back-sharp" size={30} color="#900" />

      <View style={[styles.playPause]}>
        <Icon name="play" size={30} color="#900" />
        {/* <Icon name="stop" size={30} color="#900" /> */}
      </View>
      <Icon name="play-skip-forward" size={30} color="#900" />
    </View>
  );
};

export default Controls;
