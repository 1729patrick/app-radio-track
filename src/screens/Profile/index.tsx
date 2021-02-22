import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import GetPremium from './components/GetPremium';
import styles from './styles';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

import Item from '~/components/List/Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '~/contexts/ThemeContext';

const Profile = () => {
  const { palette } = useTheme();
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const screens = useMemo(
    () => [
      {
        title: 'País/Região',
        icon: 'earth',
        Icon: IconMD,
        onPress: () => navigate('Location'),
      },
      {
        title: 'Tema',
        icon: 'color-palette',
        Icon: IconIon,
        onPress: () => navigate('Theme'),
      },
      // {
      //   title: 'Alarme',
      //   icon: 'alarm',
      // },
      {
        title: 'Sugerir estação de rádio',
        icon: 'radio',
        Icon: IconMD,
        onPress: () => navigate('SuggestRadio'),
      },
      {
        title: 'Termos e Condições',
        icon: 'document-text',
        Icon: IconIon,
        onPress: () => navigate('TermsAndConditions'),
      },
      {
        title: 'Política de Privacidade',
        icon: 'lock',
        Icon: IconMD,
        onPress: () => navigate('PolicyPrivacy'),
      },
    ],
    [navigate],
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <GetPremium />

        {screens.map((screen) => (
          <Item
            key={screen.title}
            Icon={screen.Icon}
            icon={screen.icon}
            onPress={screen.onPress}
            title={screen.title}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(Profile);
