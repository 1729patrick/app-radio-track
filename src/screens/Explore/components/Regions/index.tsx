import React, { memo, useCallback } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import { REGIONS } from './data';
import { useNavigation } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import isEqual from 'lodash.isequal';

const { width } = Dimensions.get('window');

const Regions = () => {
  const { navigate } = useNavigation();

  const onShowRegion = useCallback(
    ({ title, id }: { title: string; id: (string | never[])[] }) => {
      const url = `playlists/region/br/${id}`;
      navigate('Playlist', { title, url });
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({ item }: { item: { id: string; image: any; title: string }[] }) => {
      return (
        <View style={styles.group}>
          {item.map((region) => (
            <View style={styles.region} key={region.id}>
              <RectButton
                rippleColor={StyleGuide.palette.background}
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
    [onShowRegion],
  );

  return (
    <View>
      <Text style={[styles.title]}>Regiões</Text>

      <FlatList
        horizontal
        data={REGIONS}
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

export default memo(Regions, isEqual);
