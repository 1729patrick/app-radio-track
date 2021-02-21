import React from 'react';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';

import Item from '~/components/List/Item';
import { useTheme } from '~/contexts/ThemeContext';

const Theme = () => {
  const { setTheme } = useTheme();

  const themes = [
    {
      title: 'Escuro',
      icon: 'moon',
      Icon: IconIon,
      onPress: () => setTheme('dark'),
    },
    {
      title: 'Claro',
      icon: 'sunny-sharp',
      Icon: IconIon,
      onPress: () => setTheme('light'),
    },
    {
      title: 'Padrão do sistema',
      icon: 'theme-light-dark',
      Icon: IconMD,
      onPress: () => setTheme(),
    },
  ];

  return (
    <>
      {themes.map((theme) => (
        <Item
          key={theme.title}
          Icon={theme.Icon}
          icon={theme.icon}
          onPress={theme.onPress}
          title={theme.title}
        />
      ))}
    </>
  );
};

export default Theme;
