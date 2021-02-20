import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import GetPremium from './components/GetPremium';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';

import SuggestRadio from './screens/SuggestRadio';
import Theme from './screens/Theme';
import { useModal } from '~/contexts/ModalContext';

const Profile = () => {
  // const modalRef = useRef<ModalHandler>(null);
  const { setContent } = useModal();
  const screens = useMemo(
    () => [
      {
        title: 'País/Região',
        icon: 'earth',
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
      {
        title: 'Alarme',
        icon: 'alarm',
      },
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
        title: 'Sobre',
        descriptions: [
          'Termos e Condições',
          'Politica de Privacidade',
          'Feedback',
        ],
        icon: 'information-outline',
      },
    ],
    [setContent],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <GetPremium />

        {screens.map((screen) => (
          <RectButton
            key={screen.title}
            style={styles.screenContainer}
            rippleColor={StyleGuide.palette.primary}
            onPress={screen.onPress}>
            <Icon name={screen.icon} size={22} />
            <View style={styles.screenInfo}>
              <Text style={styles.screenTitle}>{screen.title}</Text>
            </View>
          </RectButton>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(Profile);
