import isEqual from 'lodash.isequal';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

const Suggest = () => {
  return (
    <View>
      <Text>suggest</Text>
    </View>
  );
};

export default memo(Suggest, isEqual);
