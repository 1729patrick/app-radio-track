import React, { memo, useCallback } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import getStyles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';
import { useLocation } from '~/contexts/LocationContext';

const { width } = Dimensions.get('window');

export type RegionType = { id: string; image: any; title: string };

const Regions = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const styles = useStyles(getStyles);
  const { palette } = useTheme();
  const { regions } = useLocation();

  const onShowRegion = useCallback(
    ({ title, id }: RegionType) => {
      const url = `playlists/region/br/${id}`;
      navigate('Playlist', { title, url });
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({ item }: { item: RegionType[] }) => {
      return (
        <View style={styles.group}>
          {item.map((region) => (
            <View style={styles.region} key={region.id}>
              <RectButton
                rippleColor={palette.background}
                style={styles.button}
                onPress={() => onShowRegion(region)}>
                <Image style={styles.image} source={region.image} />
                <Text style={styles.regionTitle}>{region.title}</Text>
              </RectButton>
            </View>
          ))}
        </View>
      );
    },
    [
      onShowRegion,
      palette.background,
      styles.button,
      styles.group,
      styles.image,
      styles.region,
      styles.regionTitle,
    ],
  );

  return (
    <View>
      <Text style={[styles.title]}>Regiões</Text>

      <FlatList
        horizontal
        data={regions}
        renderItem={renderItem}
        snapToInterval={width * 0.75}
        contentContainerStyle={styles.contentContainer}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default memo(Regions);
