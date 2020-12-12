import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

type InputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};
const Input = ({ placeholder, onChangeText }: InputProps) => {
  return (
    <TextInput
      style={styles.container}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};

export default Input;
