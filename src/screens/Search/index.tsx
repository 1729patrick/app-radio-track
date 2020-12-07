import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import RoundButton from '~/components/Button/Round';
import { usePlayer } from '~/contexts/PlayerContext';
import { useFetch } from '~/hooks/useFetch';
import { FetchWithPagination } from '~/types/Fetch';
import StyleGuide from '~/utils/StyleGuide';
import Radio from '~/components/Radio/Item';

import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Error from '~/components/Error';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import { usePlaying } from '~/contexts/PlayingContext';
import isEqual from 'lodash.isequal';
import { useKeyboard } from '~/hooks/useKeyboard';

type SearchProps = {
  onCloseSearch: () => void;
};

const Search: React.FC<SearchProps> = () => {
  const { playingRadioId } = usePlaying();
  const [searchTerm, setSearchTerm] = useState('');
  const { height } = useKeyboard();
  const { data, error } = useFetch<FetchWithPagination>(
    searchTerm.trimLeft().trimRight().length >= 3
      ? `/search?q=${searchTerm.trimLeft().trimRight()}`
      : null,
  );
  const randomAdIndex = useMemo(() => {
    const randomIndex = (Math.random() * 12).toFixed(0);

    return +randomIndex;
  }, []);

  const { pop } = useNavigation<StackNavigationProp<any>>();

  const { onExpandPlayer } = usePlayer();

  const onBackPress = () => {
    pop();
  };

  const onClearSearch = () => {
    setSearchTerm('');
  };

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      onExpandPlayer({
        title: searchTerm || '',
        radios: data?.items?.length ? data?.items : [],
        radioIndex,
      });
    },
    [data?.items, onExpandPlayer, searchTerm],
  );

  const notFound = useMemo(() => data && !data?.items?.length, [data]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <>
          <Radio
            playing={playingRadioId === item.id}
            item={item}
            index={index}
            onExpandPlayer={onExpandPlayerPress}
          />
          {index === randomAdIndex && <Banner id={BLOCKS.MUSIC} />}
        </>
      );
    },
    [onExpandPlayerPress, playingRadioId, randomAdIndex],
  );

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.header}>
        <RoundButton
          onPress={onBackPress}
          name={'arrow-back'}
          size={24}
          Icon={Icon}
        />

        <TextInput
          placeholder="Pesquise a rádio"
          placeholderTextColor={StyleGuide.palette.secondary}
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoFocus
        />

        {!!searchTerm && (
          <RoundButton
            onPress={onClearSearch}
            name={'close'}
            size={26}
            Icon={Icon}
          />
        )}
      </View>

      {notFound && (
        <View style={[styles.notFound, { height }]}>
          <Text style={styles.notFoundTitle}>
            Rádio "{searchTerm}" não encontrada.
          </Text>

          <Text style={styles.notFoundDescription}>
            Tente de novo com um novo termo de busca.
          </Text>
        </View>
      )}

      {!data?.items?.length && !notFound && !!error && (
        <Error type={error?.message} />
      )}

      {!notFound && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          initialNumToRender={24}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={data?.items}
          keyExtractor={({ id }) => `${id}`}
          renderItem={renderItem}
        />
      )}
    </Animated.View>
  );
};

export default memo(Search, isEqual);
