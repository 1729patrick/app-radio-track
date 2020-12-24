import React, { memo, useMemo } from 'react';
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
  disabled?: boolean;
};

const RoundButton: React.FC<RoundButtonProp> = ({
  Icon,
  name,
  size,
  onPress,
  style,
  color = StyleGuide.palette.primary,
  disabled,
}) => {
  const opacity = useMemo(() => {
    return disabled ? 0.4 : 1;
  }, [disabled]);

  return (
    <BorderlessButton
      rippleColor={StyleGuide.palette.secondary}
      hitSlop={{ top: 58, bottom: 58, left: 58, right: 58 }}
      enabled={!disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          height: size + 10,
          width: size + 10,
          borderRadius: (size + 10) / 2,
          opacity,
        },
        style,
      ]}>
      <Icon name={name} size={size} color={color} />
    </BorderlessButton>
  );
};

export default memo(RoundButton);
