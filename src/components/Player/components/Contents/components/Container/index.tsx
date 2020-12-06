import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

Animated.FlatList = Animated.createAnimatedComponent(FlatList);

const { width } = Dimensions.get('window');

const Container = ({ pages, scrollHandler, animation }, ref) => {
  const flatListRef = useRef(null);
  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ width }}>
        <item.Component />
      </View>
    ),
    [],
  );

  const scrollToIndex = (tabIndex, animated) => {
    flatListRef.current?.scrollToOffset({
      offset: tabIndex * width,
      animated,
    });
  };

  useImperativeHandle(ref, () => ({
    scrollToIndex,
  }));

  const style = useAnimatedStyle(
    () => ({ opacity: animation.value, flexGrow: 1 }),
    [animation.value],
  );

  return (
    <Animated.View style={[style]}>
      <Animated.FlatList
        ref={flatListRef}
        data={pages}
        keyExtractor={({ title }) => `${title}`}
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

export default forwardRef(Container);
