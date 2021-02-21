import React from 'react';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';

import Item from '~/components/List/Item';

const themes = [
  { title: 'Escuro', icon: 'moon', Icon: IconIon },
  { title: 'Claro', icon: 'sunny-sharp', Icon: IconIon },
  { title: 'Padrão do sistema', icon: 'theme-light-dark', Icon: IconMD },
];
const Theme = () => {
  return (
    <>
      {themes.map((theme) => (
        <Item
          key={theme.title}
          Icon={theme.Icon}
          icon={theme.icon}
          description={'screen.description'}
          onPress={theme.onPress}
          title={theme.title}
        />
      ))}
    </>
  );
};

export default Theme;
