import React, { forwardRef, memo } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

type InputProps = {
  placeholder: string;
  style?: object;
  onChangeText: (text: string) => void;
};

const Input: React.ForwardRefRenderFunction<TextInputProps, InputProps> = (
  { placeholder, onChangeText, style },
  ref,
) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.container, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};

export default memo(forwardRef(Input));
