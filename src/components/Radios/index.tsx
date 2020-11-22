import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { PlayerState } from '../Player';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import Radio from './components/Radio';
import RoundButton from '../Button/Round';

import { RadioType } from '~/types/Station';

type RadiosProps = {
  title: string;
  onOpenPlayer: (args: PlayerState & { radioIndex: number }) => void;
  radios?: RadioType[];
  showAll?: boolean;
  onShowAll?: (title: string) => void;
  onEndReached: () => void;
};

const Radios: React.FC<RadiosProps> = ({
  title,
  radios = [],
  onOpenPlayer,
  showAll,
  onShowAll,
  onEndReached,
}) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio
          item={item}
          index={index}
          onOpenPlayer={({ radioIndex }) =>
            onOpenPlayer({ title, radios, radioIndex })
          }
        />
      );
    },
    [onOpenPlayer, radios, title],
  );

  const onShowAllPress = () => {
    onShowAll && onShowAll(title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={onShowAllPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        {showAll && (
          <RoundButton
            onPress={onShowAllPress}
            name={'md-arrow-forward'}
            size={24}
            Icon={Icon}
          />
        )}
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={3}
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsVerticalScrollIndicator={false}
        data={radios}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
      />
    </View>
  );
};

export default Radios;
