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
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      disabled={disabled}>
      <Text style={[styles.title, titleStyle, disabled ? styles.disabled : {}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(WithoutFeedbackButton);
