import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
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

type SearchProps = {
  onCloseSearch: () => void;
};

const Search: React.FC<SearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useFetch<FetchWithPagination>(
    searchTerm.trimLeft().trimRight().length >= 3
      ? `/search?q=${searchTerm.trimLeft().trimRight()}`
      : null,
  );

  const { pop } = useNavigation<StackNavigationProp<{}>>();

  const { onExpandPlayer } = usePlayer();

  const onBackPress = () => {
    pop();
  };

  const onClearSearch = () => {
    setSearchTerm('');
  };

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      const radio = data?.items[radioIndex];

      onExpandPlayer({
        title: radio?.name || '',
        radios: radio ? [radio] : [],
        radioIndex: 0,
      });
    },
    [data?.items, onExpandPlayer],
  );

  const notFound = useMemo(() => data && !data?.items?.length, [data]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Radio item={item} index={index} onExpandPlayer={onExpandPlayerPress} />
      );
    },
    [onExpandPlayerPress],
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
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Rádio "{searchTerm}" não encontrada.
          </Text>

          <Text style={styles.notFoundDescription}>
            Tente de novo com um novo termo de busca.
          </Text>
        </View>
      )}

      {!notFound && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
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

export default Search;
