import React, { memo } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import styles from './styles';

const Indicator = () => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

export default memo(Indicator);
