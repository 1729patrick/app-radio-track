import isEqual from 'lodash.isequal';
import React, { memo, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import RadioItem from '~/components/Radio/Item';
import RadioCard from '~/components/Radio/Card';

import styles from './styles';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import StyleGuide from '~/utils/StyleGuide';
import Loader from '~/components/Loader';

const Suggest = () => {
  const randomAdIndex = useMemo(() => {
    const randomIndex = (Math.random() * 12).toFixed(0);

    return +randomIndex;
  }, []);

  const { data } = useFetchPagination('playlists/recommend');

  const renderItemSimilar = useCallback(
    (item, index) => {
      return (
        <View key={item.id}>
          <RadioItem
            item={item}
            index={index}
            onExpandPlayer={() => {}}
            playing={false}
          />

          {index === randomAdIndex && <Banner id={BLOCKS.MUSIC} />}
        </View>
      );
    },
    [randomAdIndex],
  );

  const renderItemRegion = useCallback(({ item, index }) => {
    return (
      <RadioCard
        item={item}
        index={index}
        onExpandPlayer={() => {}}
        playing={false}
      />
    );
  }, []);

  // const panHandler = useAnimatedGestureHandler(
  //   {
  //     onActive: (event, context) => {
  //       console.log(event.absoluteY);
  //     },
  //   },
  //   [],
  // );

  return null;
  return <Loader backgroundColor={StyleGuide.palette.border} />;
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.title, { paddingTop: StyleGuide.spacing * 2 }]}>
        Rádios parecidas
      </Text>

      {data?.items.slice(0, 5).map(renderItemSimilar)}

      <Text style={styles.title}>Rádios da mesma região</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        initialNumToRender={24}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.carouselContentContainer}
        data={data?.items.slice(0, 5)}
        keyExtractor={({ id }) => `${id}`}
        renderItem={renderItemRegion}
        onEndReachedThreshold={3}
        horizontal
      />
    </ScrollView>
  );
};

export default memo(Suggest, isEqual);
