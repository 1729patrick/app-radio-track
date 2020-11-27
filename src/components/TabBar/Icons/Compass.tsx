import * as React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import StyleGuide from '~/utils/StyleGuide';

const style = {
  marginTop: -3.5,
  marginBottom: -3,
  marginLeft: -1.75,
  marginRight: -2.75,
};
export const InactiveCompass = () => {
  return (
    <Icon
      name="ios-compass-outline"
      color={StyleGuide.palette.secondary}
      size={24.5}
      style={style}
    />
  );
};

export const ActiveCompass = () => {
  return (
    <Icon
      name="ios-compass-sharp"
      color={StyleGuide.palette.primary}
      size={24.5}
      style={style}
    />
  );
};
