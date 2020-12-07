import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import styles from './styles';
import Container, { ContainerHandler } from '../Container';
import Header from '../Header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import isEqual from 'lodash.isequal';
import { RouteType } from '../..';

const { width } = Dimensions.get('window');

export type TabNavigatorHandler = {
  setTabActive: (tabIndex: number, animated: boolean) => void;
  clearTabActive: () => void;
  initializeTabActive: () => void;
};

type TabNavigatorProps = {
  onPress: () => void;
  routes: RouteType[];
  checkAnimated: () => boolean;
  animation: Animated.SharedValue<number>;
};

const TabNavigator: React.ForwardRefRenderFunction<
  TabNavigatorHandler,
  TabNavigatorProps
> = ({ onPress, routes, checkAnimated, animation }, ref) => {
  const translateX = useSharedValue(-1);
  const containerRef = useRef<ContainerHandler>(null);

  const scrollHandler = useAnimatedScrollHandler<{}>(
    {
      onScroll: (event) => {
        translateX.value = clamp(
          event.contentOffset.x / width,
          0,
          routes.length,
        );
      },
    },
    [],
  );

  const setTabActive = (tabIndex: number, animated: boolean) => {
    if (translateX.value === -1) {
      translateX.value = tabIndex;
    }

    containerRef.current?.scrollToIndex(tabIndex, animated);
  };

  const initializeTabActive = () => {
    if (translateX.value === -1) {
      setTabActive(0, false);
    }
  };

  const clearTabActive = () => {
    translateX.value = -1;
  };

  useImperativeHandle(ref, () => ({
    setTabActive,
    clearTabActive,
    initializeTabActive,
  }));

  const onPressTab = (tabIndex: number) => {
    setTabActive(tabIndex, checkAnimated());
    onPress();
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={onPressTab}
        routes={routes}
        translateX={translateX}
        animation={animation}
      />

      <Container
        routes={routes}
        scrollHandler={scrollHandler}
        ref={containerRef}
        animation={animation}
      />
    </View>
  );
};

export default memo(forwardRef(TabNavigator), isEqual);
