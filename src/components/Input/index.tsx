import React, { forwardRef, memo } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';
import getStyles from './styles';

type InputProps = {
  placeholder: string;
  style?: object;
  onChangeText: (text: string) => void;
};

const Input: React.ForwardRefRenderFunction<
  TextInput,
  InputProps & TextInputProps
> = ({ placeholder, onChangeText, style, ...props }, ref) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.container, style]}
      placeholder={placeholder}
      placeholderTextColor={palette.light}
      onChangeText={onChangeText}
    />
  );
};

export default memo(forwardRef(Input));
