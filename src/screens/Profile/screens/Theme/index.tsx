import React from 'react';
import { View, Text } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton } from 'react-native-gesture-handler';

const themes = [
  { title: 'Escuro', icon: 'moon', Icon: IconIon },
  { title: 'Claro', icon: 'sunny-sharp', Icon: IconIon },
  { title: 'Padrão do sistema', icon: 'theme-light-dark', Icon: IconMD },
];
const Theme = () => {
  return (
    <>
      {themes.map((theme) => (
        <RectButton
          style={styles.theme}
          key={theme.title}
          rippleColor={StyleGuide.palette.secondary}>
          <theme.Icon
            name={theme.icon}
            color={StyleGuide.palette.primary}
            size={22}
          />
          <Text style={styles.title}>{theme.title}</Text>
        </RectButton>
      ))}
    </>
  );
};

export default Theme;
