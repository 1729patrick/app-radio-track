import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

const RoundButton = ({ Icon, name, size, onPress }) => {
  return (
    <BorderlessButton
      rippleColor={StyleGuide.palette.secondary}
      onPress={onPress}
      style={[
        styles.container,
        {
          height: size + 5,
          width: size + 5,
          borderRadius: (size + 5) / 2,
        },
      ]}>
      <Icon name={name} size={size} color={StyleGuide.palette.primary} />
    </BorderlessButton>
  );
};

export default RoundButton;
