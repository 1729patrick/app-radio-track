import React, { memo, useMemo } from 'react';
import { Linking, View } from 'react-native';
import GetPremium from './components/GetPremium';
import styles from './styles';
import IconMDI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMD from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

import Item from '~/components/List/Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '~/contexts/ThemeContext';
import { useIAP } from '~/contexts/IAPContext';
import Header from '~/components/Header';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { useRegion } from '~/contexts/RegionContext';
import { REGIONS } from '~/data/regions';

const Profile = () => {
  const { translateY } = useAnimatedHeader();

  const { isPremium } = useIAP();

  const { palette } = useTheme();
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { regionId } = useRegion();

  const screens = useMemo(
    () => [
      {
        title: 'País/Região',
        description: REGIONS.find((r) => r.id === regionId)?.title,
        icon: 'earth',
        Icon: IconMDI,
        onPress: () => navigate('Location'),
      },
      {
        title: 'Tema',
        icon: 'color-palette',
        Icon: IconIon,
        onPress: () => navigate('Theme'),
      },

      {
        title: 'Sugerir estação de rádio',
        icon: 'radio',
        Icon: IconMDI,
        onPress: () => navigate('SuggestRadio'),
      },

      {
        title: 'Política de Privacidade',
        icon: 'lock',
        Icon: IconMDI,
        onPress: () => navigate('PolicyPrivacy'),
      },
      {
        title: 'Cancelar Assinatura',
        icon: 'cancel',
        hidden: !isPremium,
        Icon: IconMD,
        onPress: () =>
          Linking.openURL(
            'https://play.google.com/store/account/subscriptions?package=pax.radio.brasil&sku=mensal_sub',
          ),
      },
    ],
    [isPremium, regionId, navigate],
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      {isPremium && isPremium !== undefined && (
        <Header translateY={translateY} showBack={false} showSearch={false} />
      )}

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {!isPremium && isPremium !== undefined && <GetPremium />}

        {screens.map(
          (screen) =>
            !screen.hidden && (
              <Item
                key={screen.title}
                Icon={screen.Icon}
                icon={screen.icon}
                description={screen.description}
                onPress={screen.onPress}
                title={screen.title}
              />
            ),
        )}
      </ScrollView>
    </View>
  );
};

export default memo(Profile);
