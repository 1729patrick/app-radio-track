import React, { forwardRef, useImperativeHandle, memo, useRef } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  //@ts-ignore
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { shuffleColors, colors_ } from '~/utils/Colors';
import StyleGuide from '~/utils/StyleGuide';
import isEqual from 'lodash.isequal';

export type AnimatedBackgroundHandler = {
  scrollHandler: any;
  setup: (args: { radioIndex: number; radiosSize: number }) => void;
};

type AnimatedBackgroundProps = {
  style: object;
  children: any;
};

const { width } = Dimensions.get('window');

const AnimatedBackground: React.ForwardRefRenderFunction<
  AnimatedBackgroundHandler,
  AnimatedBackgroundProps
> = ({ children, style }, ref) => {
  // const translateX = useSharedValue(0);
  // const inputRange = useRef([0, 1]);
  // const outputRange = useRef([
  //   StyleGuide.palette.backgroundPrimary,
  //   StyleGuide.palette.backgroundPrimary,
  // ]);

  // const scrollHandler = useAnimatedScrollHandler<{}>(
  //   {
  //     onScroll: (event) => {
  //       translateX.value = event.contentOffset.x / width;
  //     },
  //   },
  //   [],
  // );

  const setup = ({
    radioIndex,
    radiosSize,
  }: {
    radioIndex: number;
    radiosSize: number;
  }) => {
    // translateX.value = radioIndex;
    // const colors = shuffleColors();
    // if (radiosSize === 1) {
    //   inputRange.current = [0, 1];
    //   outputRange.current = [colors[0], colors[0]];
    // } else {
    //   inputRange.current = [...new Array(radiosSize)].map((_, i) => i);
    //   outputRange.current = inputRange.current.map(
    //     (i) => colors[i % colors.length],
    //   );
    // }
  };

  useImperativeHandle(ref, () => ({
    scrollHandler: () => {},
    setup,
  }));

  // const styleContainer = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: interpolateColor(
  //       translateX.value,
  //       inputRange.current,
  //       outputRange.current,
  //     ),
  //   };
  // }, [translateX.value, inputRange.current, outputRange.current]);

  return (
    <Animated.View
      style={[
        style,
        { backgroundColor: StyleGuide.palette.backgroundPrimary },
      ]}>
      {children}
    </Animated.View>
  );
};

export default memo(forwardRef(AnimatedBackground), isEqual);
