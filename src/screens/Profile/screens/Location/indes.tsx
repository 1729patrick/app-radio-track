import React from 'react';
import Region from '~/components/Region';
import { REGIONS } from '~/data/regions';
import Header from '~/components/Header';
import { FlatList, View } from 'react-native';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import styles from './styles';
import { useRegion } from '~/contexts/RegionContext';

const Location = () => {
  const { regionId, setRegionId } = useRegion();
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Região/Estado'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showRightButtons={false}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={REGIONS}
        keyExtractor={(region) => region.id}
        renderItem={({ item: region }) => (
          <Region
            {...region}
            key={region.id}
            checked={region.id === regionId}
            onPress={() => setRegionId(region.id)}
          />
        )}
      />
    </View>
  );
};

export default Location;
