import React, { memo } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useStyles from '~/hooks/useStyles';
import getStyles from './styles';

type WithoutFeedbackButtonProps = {
  title: string;
  onPress: () => void;
  titleStyle?: object;
  disabled?: boolean;
};

const WithoutFeedbackButton = ({
  title,
  onPress,
  titleStyle,
  disabled,
}: WithoutFeedbackButtonProps) => {
  const styles = useStyles(getStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
      disabled={disabled}>
      <Text style={[styles.title, titleStyle, disabled ? styles.disabled : {}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(WithoutFeedbackButton);
