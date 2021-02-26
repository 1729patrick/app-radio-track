import React from 'react';
import { View } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '~/components/Header';

import Item from '~/components/List/Item';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';

import styles from './styles';

const Theme = () => {
  const { setTheme, theme } = useTheme();
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();

  const themes = [
    {
      title: 'Escuro',
      id: 'dark',
      icon: 'moon',
      Icon: IconIon,
      onPress: () => setTheme('dark'),
    },
    {
      title: 'Claro',
      icon: 'sunny-sharp',
      id: 'light',
      Icon: IconIon,
      onPress: () => setTheme('light'),
    },
    {
      title: 'Padrão do sistema',
      icon: 'theme-light-dark',
      id: 'no-preference',
      Icon: IconMD,
      onPress: () => setTheme('no-preference'),
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Tema'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />

      {themes.map(({ Icon, id, onPress, icon, title }) => (
        <Item
          showCheck
          key={title}
          Icon={Icon}
          icon={icon}
          checked={theme === id}
          onPress={onPress}
          title={title}
        />
      ))}
    </View>
  );
};

export default Theme;
