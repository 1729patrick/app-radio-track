import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { onExpandPlayer } from '~/components/Player';
import styles from './styles';

import Radio from '~/components/Radio/Card';

import { RadioType } from '~/types/Station';

export type RadiosProps = {
  title: string;
  onExpandPlayer: onExpandPlayer;
  radios?: RadioType[];
  showAll?: boolean;
  onShowAll?: (title: string) => void;
  onEndReached?: () => void;
};

const Radios: React.FC<RadiosProps> = ({
  title,
  radios = [],
  onExpandPlayer,
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
          onExpandPlayer={({ radioIndex }) =>
            onExpandPlayer({ title, radios, radioIndex })
          }
        />
      );
    },
    [onExpandPlayer, radios, title],
  );

  const onShowAllPress = () => {
    onShowAll && onShowAll(title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity activeOpacity={0.4} onPress={onShowAllPress}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={onShowAllPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          {showAll && <Text style={styles.showAll}>Ver Tudo</Text>}
        </TouchableOpacity>
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
        onEndReached={onEndReached && onEndReached}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

export default Radios;
