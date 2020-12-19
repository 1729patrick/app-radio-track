import React, { memo } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

type RoundButtonProp = {
  Icon: any;
  name: any;
  size: any;
  onPress: any;
  style?: any;
  color?: string;
};

const RoundButton: React.FC<RoundButtonProp> = ({
  Icon,
  name,
  size,
  onPress,
  style,
  color = StyleGuide.palette.primary,
}) => {
  return (
    <BorderlessButton
      rippleColor={StyleGuide.palette.secondary}
      hitSlop={{ top: 58, bottom: 58, left: 58, right: 58 }}
      onPress={onPress}
      style={[
        styles.container,
        {
          height: size + 6,
          width: size + 6,
          borderRadius: (size + 6) / 2,
        },
        style,
      ]}>
      <Icon name={name} size={size} color={color} />
    </BorderlessButton>
  );
};

export default memo(RoundButton);
