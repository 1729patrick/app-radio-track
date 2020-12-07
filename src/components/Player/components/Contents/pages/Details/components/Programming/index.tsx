import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DAYS = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo',
];

const { width } = Dimensions.get('window');

import styles, { CARD_PADDING } from './styles';

type ProgramType = {
  from: number;
  to: number;
  name: string;
};
type ProgrammingProps = {
  programming: {
    0: ProgramType[];
    1: ProgramType[];
    2: ProgramType[];
    3: ProgramType[];
    4: ProgramType[];
    5: ProgramType[];
    6: ProgramType[];
  };
};

const TITLE_HEIGHT = 60.25;
const PROGRAMING_HEIGHT = 37;

const FIXED_HEIGHT = TITLE_HEIGHT + CARD_PADDING;

type ItemHandler = {
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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Item: React.ForwardRefRenderFunction<ItemHandler, ItemProps> = forwardRef(
  ({ programmingDay, day, onExpandAll, onMinimizeAll }, ref) => {
    const [title, setTitle] = useState('VER MAIS');
    const size = useMemo(() => {
      return programmingDay.length;
    }, [programmingDay]);

    const fullHeight = useMemo(() => {
      return FIXED_HEIGHT + CARD_PADDING + size * PROGRAMING_HEIGHT;
    }, [size]);

    const minHeight = useMemo(() => {
      return FIXED_HEIGHT + PROGRAMING_HEIGHT * Math.min(size, 5);
    }, [size]);

    const maxHeight = useSharedValue(minHeight);

    const onExpand = useCallback(() => {
      maxHeight.value = withTiming(fullHeight, {
        duration: 200,
      });

      setTitle('VER MENOS');
    }, [fullHeight, maxHeight]);

    const onMinimize = useCallback(() => {
      'worklet';

      setTitle('VER MAIS');
      maxHeight.value = withTiming(minHeight, {
        duration: 200,
      });
    }, [maxHeight, minHeight]);

    useImperativeHandle(ref, () => ({
      onMinimize,
      onExpand,
    }));

    const showMore = () => {
      if (maxHeight.value !== fullHeight) {
        onExpandAll();
        return;
      }

      onMinimizeAll();
    };

    const style = useAnimatedStyle(() => {
      return { maxHeight: maxHeight.value };
    }, [maxHeight.value]);

    const showMoreStyle = useAnimatedStyle(() => {
      return { top: maxHeight.value - 17 };
    }, [maxHeight.value]);

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, style]}>
          <Text style={[styles.title]}>{day}</Text>

          {programmingDay.map((program: ProgramType, index: number) => (
            <View style={styles.programming} key={index}>
              <Text
                style={[styles.dayTitle, styles.nameTitle]}
                numberOfLines={1}>
                {program.name}
              </Text>
              <Text style={styles.dayTitle}>{program.from} h</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.showMoreContainer, showMoreStyle]}>
          <TouchableWithoutFeedback
            style={styles.showMoreTitle}
            onPress={showMore}>
            <Text>{title}</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  },
);

const Programming: React.FC<ProgrammingProps> = ({ programming }) => {
  const itemsRef = useRef<ItemHandler[]>([]);

  const onMinimizeAll = useCallback(() => {
    itemsRef.current.map(({ onMinimize }) => onMinimize());
  }, []);

  const onExpandAll = useCallback(() => {
    itemsRef.current.map(({ onExpand }) => onExpand());
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: 0 | 1 | 2 | 3 | 4 | 5 | 6; index: number }) => {
      return (
        <Item
          programmingDay={programming[item]}
          day={DAYS[item]}
          index={index}
          onExpandAll={onExpandAll}
          onMinimizeAll={onMinimizeAll}
          ref={(ref) => (itemsRef.current[index] = ref)}
        />
      );
    },
    [itemsRef, onExpandAll, onMinimizeAll, programming],
  );

  return (
    <AnimatedFlatList
      data={Object.keys(programming)}
      keyExtractor={(id: number) => `${id}`}
      renderItem={renderItem}
      horizontal
      snapToInterval={width}
      disableIntervalMomentum
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Programming;
