import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { STATUS_BAR_HEIGHT } from '~/components/Header/constants';
import { COMPACT_HEIGHT } from '~/components/Player/constants';

import { INDICATOR_HEIGHT, INDICATOR_MARGIN_TOP } from '../../constants';
import { HEADER_HEIGHT } from '../Header/constants';
import { RouteType } from '../TabNavigator';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width } = Dimensions.get('window');

export type ContainerHandler = {
  scrollToIndex: (tabIndex: number, animated: boolean) => void;
  unMountPages: () => void;
  mountPages: () => void;
};

type ContainerProps = {
  routes: RouteType[];
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  animation: Animated.SharedValue<number>;
  routeProps?: any;
};

const { height } = Dimensions.get('window');

const PAGE_HEIGHT =
  height -
  COMPACT_HEIGHT -
  STATUS_BAR_HEIGHT -
  HEADER_HEIGHT -
  INDICATOR_HEIGHT -
  INDICATOR_MARGIN_TOP;

const Container: React.ForwardRefRenderFunction<
  ContainerHandler,
  ContainerProps
> = ({ routes, scrollHandler, animation, routeProps }, ref) => {
  const [show, setShow] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  const renderItem = useCallback(
    ({ item }: { item: RouteType }) => {
      // if (!show) {
      //   return null;
      // }

      return (
        <View style={{ width, height: PAGE_HEIGHT }}>
          <item.Component routeProps={routeProps} show={show} />
        </View>
      );
    },
    [routeProps, show],
  );

  const scrollToIndex = useCallback((tabIndex: number, animated: boolean) => {
    flatListRef.current?.scrollToOffset({
      offset: tabIndex * width,
      animated,
    });
  }, []);

  const mountPages = useCallback(() => {
    setShow(true);
  }, []);

  const unMountPages = useCallback(() => {
    setShow(false);
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToIndex,
    mountPages,
    unMountPages,
  }));

  const style = useAnimatedStyle(
    () => ({ opacity: animation.value, flexGrow: 1 }),
    [animation.value],
  );

  return (
    <Animated.View style={[style]}>
      <AnimatedFlatList
        ref={flatListRef}
        data={routes}
        keyExtractor={({ title }: RouteType) => title}
        renderItem={renderItem}
        horizontal
        decelerationRate={'fast'}
        snapToInterval={width}
        disableIntervalMomentum
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
};

export default memo(forwardRef(Container));
