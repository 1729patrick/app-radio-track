import React, { memo } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';
import isEqual from 'lodash.isequal';

import styles from './styles';

type RoundButtonProp = {
  Icon: any;
  name: any;
  size: any;
  onPress: any;
  style?: any;
};

const RoundButton: React.FC<RoundButtonProp> = ({
  Icon,
  name,
  size,
  onPress,
  style,
}) => {
  return (
    <BorderlessButton
      rippleColor={StyleGuide.palette.secondary}
      hitSlop={{ top: 42, bottom: 42, left: 42, right: 42 }}
      onPress={onPress}
      style={[
        styles.container,
        {
          height: size + 5,
          width: size + 5,
          borderRadius: (size + 5) / 2,
        },
        style,
      ]}>
      <Icon name={name} size={size} color={StyleGuide.palette.primary} />
    </BorderlessButton>
  );
};

export default memo(RoundButton, isEqual);
