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
  const { regions, setRegionId, regionId } = useLocation();
  const regionsRef = useRef<RegionsHandler>(null);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Estado'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showRightButtons={false}
      />
      <Regions
        regions={regions}
        ref={regionsRef}
        initialRegionId={regionId}
        onEffectRegionId={setRegionId}
      />
    </View>
  );
};

export default Location;
