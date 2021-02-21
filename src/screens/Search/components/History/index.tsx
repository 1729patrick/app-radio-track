import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyleGuide from '~/utils/StyleGuide';

import getStyles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useSearchHistory } from '~/contexts/SearchHistoryContext';
import { useTheme } from '~/contexts/ThemeContext';

type HistoryProps = {
  onPress: (searchTerm: string) => void;
};
const History = ({ onPress }: HistoryProps) => {
  const { getSearchHistory } = useSearchHistory();
  const { palette } = useTheme();

  const styles = useMemo(() => {
    return getStyles(palette);
  }, [palette]);

  const histories = useMemo(getSearchHistory, [getSearchHistory]);

  return (
    <View style={styles.container}>
      {histories.map((searchTerm) => (
        <RectButton
          rippleColor={palette.secondary}
          style={styles.item}
          key={searchTerm}
          onPress={() => onPress(searchTerm)}>
          <Icon name="history" size={24} color={palette.light} />
          <Text style={styles.title} numberOfLines={1}>
            {searchTerm}
          </Text>
          <Icon name="arrow-top-left" size={23} color={palette.light} />
        </RectButton>
      ))}
    </View>
  );
};

export default memo(History);
