import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import Header from '~/components/Header';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';

import getStyles from './styles';
import useStyles from '~/hooks/useStyles';
import Logo from '~/components/Logo';

const Theme = () => {
  const styles = useStyles(getStyles);
  const { translateY } = useAnimatedHeader();
  const { palette } = useTheme();

  const uniqueId = useMemo(() => {
    return getUniqueId();
  }, []);

  const version = useMemo(() => {
    return DeviceInfo.getVersion();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Sobre'}
        backgroundColor={palette.background}
        elevation={0}
        showRightButtons={false}
      />

      <View>
        <View style={styles.logo}>
          <Logo />
        </View>
        <Text style={styles.title}>{version}</Text>
        <Text style={styles.title}>{uniqueId}</Text>
      </View>
    </View>
  );
};

export default memo(Theme);
