import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import styles from './styles';
import Container from '../Container';
import Header from '../Header';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

const { width } = Dimensions.get('window');
const TabNavigator = ({ onPress, pages, checkAnimated, animation }, ref) => {
  const translateX = useSharedValue(-1);
  const containerRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler<{}>(
    {
      onScroll: (event) => {
        translateX.value = clamp(
          event.contentOffset.x / width,
          0,
          pages.length,
        );
      },
    },
    [],
  );

  const setTabActive = (tabIndex, animated) => {
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
        pages={pages}
        translateX={translateX}
        animation={animation}
      />

      <Container
        pages={pages}
        scrollHandler={scrollHandler}
        ref={containerRef}
        animation={animation}
      />
    </View>
  );
};

export default forwardRef(TabNavigator);
