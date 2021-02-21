import React, { memo } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useStyles from '~/hooks/useStyles';

import getStyles from './styles';

const Indicator = () => {
  const styles = useStyles(getStyles);

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

export default memo(Indicator);
