import React, { useEffect, useRef } from 'react';

import Header from '~/components/Header';
import { View } from 'react-native';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import styles from './styles';
import Regions, { RegionsHandler } from '~/components/Regions';
import { useLocation } from '~/contexts/LocationContext';

const Location = () => {
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();
  const { regions, setRegionId } = useLocation();
  const regionsRef = useRef<RegionsHandler>(null);

  useEffect(() => {
    return () => {
      setRegionId(regionsRef.current?.regionId || '');
    };
  }, [setRegionId]);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Região/Estado'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showRightButtons={false}
      />
      <Regions regions={regions} ref={regionsRef} />
    </View>
  );
};

export default Location;
