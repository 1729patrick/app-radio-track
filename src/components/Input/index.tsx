import React, { forwardRef, memo } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

type InputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

type Ref =
  | string
  | ((instance: TextInput | null) => void)
  | React.RefObject<TextInput>
  | null
  | undefined;

const Input = ({ placeholder, onChangeText }: InputProps, ref: Ref) => {
  return (
    <TextInput
      ref={ref}
      style={styles.container}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};

export default memo(forwardRef(Input));
