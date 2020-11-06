import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Artist = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Rádio XXX</Text>
      <Text style={[styles.description]}>São Miguel do Oeste</Text>
    </View>
  );
};

export default Artist;
