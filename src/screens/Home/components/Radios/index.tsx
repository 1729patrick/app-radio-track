import React, { memo, useCallback } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { onExpandPlayer } from '~/components/Player';
import styles from './styles';
import { usePlaying } from '~/contexts/PlayingContext';

import Radio from '~/components/Radio/Card';

import Icon from 'react-native-vector-icons/Ionicons';
import { RadioType } from '~/types/Station';
import isEqual from 'lodash.isequal';
import { CARD_SIZE } from '~/components/Radio/Card/constants';
import { useSharedValue } from 'react-native-reanimated';
import RoundButton from '~/components/Button/Round';
import StyleGuide from '~/utils/StyleGuide';

export type RadiosProps = {
  title: string;
  onExpandPlayer: onExpandPlayer;
  radios?: RadioType[];
  showAll?: boolean;
  onShowAll?: (title: string) => void;
  onEndReached?: () => void;
};

const { width } = Dimensions.get('window');
const Radios: React.FC<RadiosProps> = ({
  title,
  radios = [],
  onExpandPlayer,
  showAll,
  onShowAll,
  onEndReached,
}) => {
  const { playingRadioId } = usePlaying();
  const x = useSharedValue(width / 3.4);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio
          item={item}
          index={index}
          playing={playingRadioId === item.id}
          onExpandPlayer={({ radioIndex }) => {
            onExpandPlayer({ title, radios, radioIndex });
          }}
        />
      );
    },
    [playingRadioId, onExpandPlayer, radios, title],
  );

  const onShowAllPress = useCallback(() => {
    onShowAll && onShowAll(title);
  }, [onShowAll, title]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity activeOpacity={0.4} onPress={onShowAllPress}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </View>

        {showAll && (
          <RoundButton
            onPress={onShowAllPress}
            Icon={Icon}
            size={24}
            name="md-arrow-forward"
            color={StyleGuide.palette.light}
          />
        )}
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsVerticalScrollIndicator={false}
        data={radios}
        snapToInterval={CARD_SIZE}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        onEndReached={onEndReached && onEndReached}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

export default memo(Radios, isEqual);
