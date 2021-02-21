import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import GetPremium from './components/GetPremium';
import styles from './styles';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

import SuggestRadio from './screens/SuggestRadio';
import Theme from './screens/Theme';
import { useModal } from '~/contexts/ModalContext';
import Location from './screens/Location/indes';
import Item from '~/components/List/Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '~/contexts/ThemeContext';

const Profile = () => {
  const { palette } = useTheme();
  const { setContent } = useModal();
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const screens = useMemo(
    () => [
      {
        title: 'País/Região',
        icon: 'earth',
        Icon: IconMD,
        onPress: () =>
          setContent({
            id: 'Location',
            content: Location,
            title: 'Escolha o seu estado',
            confirm: 'Confirmar',
          }),
      },
      {
        title: 'Tema',
        icon: 'color-palette',
        Icon: IconIon,
        onPress: () =>
          setContent({
            id: 'Theme',
            content: Theme,
            title: 'Tema',
            confirm: 'OK',
          }),
      },
      // {
      //   title: 'Alarme',
      //   icon: 'alarm',
      // },
      {
        title: 'Sugerir estação de rádio',
        icon: 'radio',
        Icon: IconMD,
        onPress: () =>
          setContent({
            id: 'SuggestRadio',
            content: SuggestRadio,
            title: 'Sugerir estação de rádio',
            confirm: 'Enviar',
          }),
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
    [navigate, setContent],
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
