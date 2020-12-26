import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LayoutChangeEvent, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ProgramType } from '~/types/Station';
import { CARD_PADDING, TIMING_DURATION } from '../../constants';

export type ItemHandler = {
  onExpand: () => void;
  onMinimize: () => void;
};

type ItemProps = {
  programmingDay: ProgramType[];
  day: string;
  index: number;
  onExpandAll: () => void;
  onMinimizeAll: () => void;
};

import styles from './styles';

const Day: React.ForwardRefRenderFunction<ItemHandler, ItemProps> = (
  { programmingDay, day, onExpandAll, onMinimizeAll },
  ref,
) => {
  const titleHeightRef = useRef(0);
  const programHeightRef = useRef(0);
  const [fullHeight, setFullHeight] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const size = useMemo(() => {
    return programmingDay.length;
  }, [programmingDay]);

  const setHeight = useCallback(() => {
    setFullHeight(
      titleHeightRef.current +
        CARD_PADDING * 2 +
        size * programHeightRef.current,
    );
  }, [size]);

  const minHeight = useMemo(() => {
    return 250;
  }, []);

  const height = useSharedValue(minHeight);

  const onExpand = useCallback(() => {
    height.value = withTiming(fullHeight, {
      duration: TIMING_DURATION,
    });

    setExpanded(true);
  }, [fullHeight, height]);

  const onMinimize = useCallback(() => {
    'worklet';

    setExpanded(false);
    height.value = withTiming(minHeight, {
      duration: TIMING_DURATION,
    });
  }, [height, minHeight]);

  useImperativeHandle(ref, () => ({
    onMinimize,
    onExpand,
  }));

  const showMore = useCallback(() => {
    if (height.value !== fullHeight) {
      onExpandAll();
      return;
    }

    onMinimizeAll();
  }, [fullHeight, height.value, onExpandAll, onMinimizeAll]);

  const showMoreStyle = useAnimatedStyle(() => {
    return { top: height.value - 17 };
  }, [height.value]);

  const onLayoutTitle = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { height } = nativeEvent.layout;

      titleHeightRef.current = height;

      if (programHeightRef.current) {
        setHeight();
      }
    },
    [setHeight],
  );

  const onLayoutProgram = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      if (programHeightRef.current) {
        return;
      }

      const { height } = nativeEvent.layout;

      programHeightRef.current = height;

      if (titleHeightRef.current) {
        setHeight();
      }
    },
    [setHeight],
  );

  const title = useMemo(() => {
    if (expanded) {
      return 'VER MENOS';
    }

    return 'VER MAIS';
  }, [expanded]);

  const style = useAnimatedStyle(() => {
    return { height: height.value };
  }, [height.value]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, style]}>
        <View style={styles.wrapper}>
          <Text style={[styles.title]} onLayout={onLayoutTitle}>
            {day}
          </Text>

          {programmingDay.map((program: ProgramType, index: number) => (
            <Animated.View
              style={[styles.programming]}
              key={index}
              onLayout={onLayoutProgram}>
              <Text
                style={[styles.dayTitle, styles.nameTitle]}
                numberOfLines={1}>
                {program.name}
              </Text>
              <Text style={styles.dayTitle}>{program.from} h</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {(fullHeight > minHeight || expanded) && (
        <Animated.View style={[styles.showMoreContainer, showMoreStyle]}>
          <TouchableWithoutFeedback
            style={styles.showMoreTitle}
            onPress={showMore}>
            <Text>{title}</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </View>
  );
};

export default memo(forwardRef(Day));
