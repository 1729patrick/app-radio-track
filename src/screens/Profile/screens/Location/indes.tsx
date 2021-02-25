import React from 'react';
import Region from '~/components/Region';
import { RegionType } from '~/screens/Explore/components/Regions';
import { REGIONS } from '~/data/regions';
import Header from '~/components/Header';
import { View } from 'react-native';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useRegion } from '~/contexts/RegionContext';

const Location = () => {
  const { regionId, setRegionId } = useRegion();
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Pais/Região'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {REGIONS.map((region: RegionType) => (
          <Region
            {...region}
            key={region.id}
            checked={region.id === regionId}
            onPress={() => setRegionId(region.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Location;
