import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import GetPremium from './components/GetPremium';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

import SuggestRadio from './screens/SuggestRadio';
import Theme from './screens/Theme';
import { useModal } from '~/contexts/ModalContext';
import Location from './screens/Location/indes';
import Item from '~/components/List/Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Profile = () => {
  const { setContent } = useModal();
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const screens = useMemo(
    () => [
      {
        title: 'País/Região',
        icon: 'earth',
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
        icon: 'theme-light-dark',
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
        icon: 'file-document-outline',
        onPress: () => navigate('TermsAndConditions'),
      },
      {
        title: 'Política de Privacidade',
        icon: 'lock',
        onPress: () => navigate('PolicyPrivacy'),
      },
    ],
    [navigate, setContent],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <GetPremium />

        {screens.map((screen) => (
          <Item
            key={screen.title}
            Icon={Icon}
            icon={screen.icon}
            description={screen.description}
            onPress={screen.onPress}
            title={screen.title}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(Profile);
