import React, { memo, useCallback, useMemo } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import getStyles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';
import { useLocation } from '~/contexts/LocationContext';

const { width } = Dimensions.get('window');

export type RegionType = { name: string; image: any; title: string };

const Regions = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const styles = useStyles(getStyles);
  const { palette } = useTheme();
  const { regions, country } = useLocation();

  const regionsGrouped = useMemo(() => {
    let original = [...regions];
    const splitted = [];
    while (original.length > 0) {
      splitted.push(original.splice(0, 4));
    }

    return splitted;
  }, [regions]);

  const onShowRegion = useCallback(
    ({ name, code }: RegionType) => {
      const url = `playlists/region/${country.code}/${code}`;
      navigate('Playlist', { title: name, url });
    },
    [navigate, country],
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
                {/* <Image style={styles.image} source={region.image} /> */}
                <Text style={styles.regionTitle}>{region.name}</Text>
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
      styles.region,
      styles.regionTitle,
    ],
  );

  // if (!regions.length) {
  //   return null;
  // }

  return (
    <View>
      <Text style={[styles.title]}>Estados</Text>

      <FlatList
        horizontal
        data={regionsGrouped}
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
