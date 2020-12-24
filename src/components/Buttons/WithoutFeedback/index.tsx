import React from 'react';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styles';

type WithoutFeedbackButtonProps = {
  title: string;
  onPress: () => void;
  titleStyle?: object;
};

const WithoutFeedbackButton = ({
  title,
  onPress,
  titleStyle,
}: WithoutFeedbackButtonProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

export default WithoutFeedbackButton;
