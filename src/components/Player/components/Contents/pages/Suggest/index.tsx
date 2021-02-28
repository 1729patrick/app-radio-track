import React, { memo, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import RadioItem from '~/components/Radio/Item';
import RadioCard from '~/components/Radio/Card';

import getStyles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import Loader from '~/components/Loader';
import { RouteProps } from '../../components/TabNavigator';
import { RadioType } from '~/types/Station';
import { useFetch } from '~/hooks/useFetch';
import { CARD_SIZE } from '~/components/Radio/Card/constants';
import { useAd } from '~/ads/contexts/AdContext';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';
import { darken, lighten } from 'polished';

type SuggestProps = {
  routeProps: RouteProps;
};

const Suggest: React.FC<SuggestProps> = ({ routeProps, show }) => {
  const { showRelationalAd } = useAd();
  const { palette, mode } = useTheme();
  const styles = useStyles(getStyles);

  const radio = useMemo(() => {
    return routeProps?.radio || {};
  }, [routeProps?.radio]);

  const close = useFetch<RadioType[]>(
    `radio/${radio.id}/closes/${JSON.stringify(radio.genres)}`,
  );

  const location = useFetch<RadioType[]>(
    `radio/${radio.id}/location/${radio.countryCode}/${radio.regionId}/${radio.cityId}`,
  );

  const onSetRadio = useCallback(
    (radioIndex: number, radios?: RadioType[]) => {
      showRelationalAd();
      routeProps.onSetRadio({
        radioIndex,
        title: '',
        radios: radios || [],
      });
    },
    [routeProps, showRelationalAd],
  );

  const renderItemSimilar = useCallback(
    (item, index) => {
      const backgroundColor =
        mode === 'light'
          ? darken(0.05, palette.backgroundSecondary)
          : lighten(0.05, palette.backgroundSecondary);

      return (
        <View key={item.id}>
          <RadioItem
            item={item}
            index={index}
            onExpandPlayer={({ radioIndex }: { radioIndex: number }) =>
              onSetRadio(radioIndex, close.data)
            }
            playing={false}
          />

          {!index && (
            <Banner id={BLOCKS.MUSIC} backgroundColor={backgroundColor} />
          )}
        </View>
      );
    },
    [close.data, onSetRadio, palette.backgroundSecondary],
  );

  const renderItemRegion = useCallback(
    ({ item, index }) => {
      return (
        <RadioCard
          item={item}
          index={index}
          onExpandPlayer={({ radioIndex }: { radioIndex: number }) =>
            onSetRadio(radioIndex, location.data)
          }
          playing={false}
        />
      );
    },
    [location.data, onSetRadio],
  );

  const locationEmpty = useMemo(() => {
    return !location.data?.length;
  }, [location.data?.length]);

  const closeEmpty = useMemo(() => {
    return !close.data?.length;
  }, [close.data?.length]);

  const closeData = useMemo(() => {
    return close.data?.slice(0, 5) || [];
  }, [close.data]);

  if (
    ((locationEmpty || closeEmpty) && !location.error && !location.error) ||
    !show
  ) {
    return <Loader backgroundColor={palette.backgroundSecondary} />;
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}>
      {!closeEmpty && !close.error && (
        <Text style={[styles.title, { paddingTop: StyleGuide.spacing * 2 }]}>
          Rádios parecidas
        </Text>
      )}

      {closeData.map(renderItemSimilar)}

      {!locationEmpty && !location.error && (
        <Text style={styles.title}>Rádios da mesma região</Text>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.carouselContentContainer}
        data={location.data}
        keyExtractor={({ id }) => `${id}`}
        renderItem={renderItemRegion}
        onEndReachedThreshold={3}
        horizontal
        snapToInterval={CARD_SIZE}
        decelerationRate={'fast'}
      />
    </ScrollView>
  );
};

export default memo(Suggest);
