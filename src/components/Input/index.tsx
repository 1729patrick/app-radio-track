import React, { forwardRef, memo } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';
import getStyles from './styles';

type InputProps = {
  placeholder: string;
  style?: object;
  onChangeText: (text: string) => void;
};

const Input: React.ForwardRefRenderFunction<TextInputProps, InputProps> = (
  { placeholder, onChangeText, style },
  ref,
) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <TextInput
      ref={ref}
      style={[styles.container, style]}
      placeholder={placeholder}
      placeholderTextColor={palette.primary}
      onChangeText={onChangeText}
    />
  );
};

export default memo(forwardRef(Input));
