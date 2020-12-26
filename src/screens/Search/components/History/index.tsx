import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useSearchHistory } from '~/contexts/SearchHistoryContext';

const History = ({ onPress }) => {
  const { getSearchHistory } = useSearchHistory();

  const histories = useMemo(getSearchHistory, [getSearchHistory]);

  return (
    <View style={styles.container}>
      {histories.map((searchTerm) => (
        <RectButton
          rippleColor={StyleGuide.palette.secondary}
          style={styles.item}
          key={searchTerm}
          onPress={() => onPress(searchTerm)}>
          <Icon name="history" size={24} color={StyleGuide.palette.light} />
          <Text style={styles.title} numberOfLines={1}>
            {searchTerm}
          </Text>
          <Icon
            name="arrow-top-left"
            size={23}
            color={StyleGuide.palette.light}
          />
        </RectButton>
      ))}
    </View>
  );
};

export default memo(History);
