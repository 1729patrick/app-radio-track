import isEqual from 'lodash.isequal';
import React, { memo, useCallback, useMemo } from 'react';
import { Dimensions, LayoutChangeEvent, Text, View } from 'react-native';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import RadioItem from '~/components/Radio/Item';
import RadioCard from '~/components/Radio/Card';

import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import Loader from '~/components/Loader';
import { RouteProps } from '../../components/TabNavigator';
import { RadioType } from '~/types/Station';
import { useFetch } from '~/hooks/useFetch';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import useScrollPanGestureHandler from '../useScrollPanGestureHandler';
import { HEADER_HEIGHT } from '~/components/Header/constants';
import { SNAP_POINTS } from '~/components/Player/constants';

type SuggestProps = {
  routeProps: RouteProps;
  animation: Animated.SharedValue<number>;
  contentHeight: Animated.SharedValue<number>;
};
const { height } = Dimensions.get('window');

const Suggest: React.FC<SuggestProps> = ({
  routeProps,
  animation,
  lowerBound,
}) => {
  const radio = useMemo(() => {
    return routeProps?.radio || {};
  }, [routeProps?.radio]);

  const { panHandler } = useScrollPanGestureHandler({
    translateY: animation,
    lowerBound,
    contentY: routeProps.contentY,
    animateToPoint: routeProps.animateToPoint,
  });

  const initialPage = useMemo(() => {
    if (radio.genres.length) {
      return 1;
    }
    return +(Math.random() * 159).toFixed(0);
  }, [radio.genres.length]);

  const close = useFetch<RadioType[]>(
    `radio/${radio.id}/closes/${JSON.stringify(
      radio.genres,
    )}/?page=${initialPage}`,
  );

  const location = useFetch<RadioType[]>(
    `radio/${radio.id}/location/${radio.countryCode}/${radio.regionId}/${radio.cityId}`,
  );

  const onSetRadio = useCallback(
    (radioIndex: number, radios?: RadioType[]) => {
      routeProps.onSetRadio({
        radioIndex,
        title: '',
        radios: radios || [],
      });
    },
    [routeProps],
  );

  const renderItemSimilar = useCallback(
    (item, index) => {
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

          {!index && <Banner id={BLOCKS.MUSIC} />}
        </View>
      );
    },
    [close.data, onSetRadio],
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

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animation.value }],
    };
  }, [animation.value]);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      lowerBound.value = -(
        nativeEvent.layout.height -
        (height - SNAP_POINTS[0] - HEADER_HEIGHT)
      );
    },
    [lowerBound],
  );

  if (locationEmpty || closeEmpty) {
    return <Loader backgroundColor={StyleGuide.palette.border} />;
  }

  return (
    <PanGestureHandler onGestureEvent={panHandler} activeOffsetY={[-10, 10]}>
      <Animated.View style={[styles.container, style]} onLayout={onLayout}>
        {!closeEmpty && (
          <Text style={[styles.title, { paddingTop: StyleGuide.spacing * 2 }]}>
            Rádios parecidas
          </Text>
        )}

        {closeData.map(renderItemSimilar)}

        {!locationEmpty && (
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
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default memo(Suggest, isEqual);
