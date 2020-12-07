import isEqual from 'lodash.isequal';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

const Details = () => {
  return (
    <View>
      <Text>details</Text>
    </View>
  );
};

export default memo(Details, isEqual);
