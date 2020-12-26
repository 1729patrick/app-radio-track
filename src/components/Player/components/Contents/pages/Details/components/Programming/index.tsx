import React, { memo, useCallback, useRef } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ProgrammingType } from '~/types/Station';
import Day, { ItemHandler } from './components/Day';

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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type ProgrammingProps = {
  programming: ProgrammingType;
};

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
        <Day
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
      initialNumToRender={1}
      disableIntervalMomentum
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(Programming);
