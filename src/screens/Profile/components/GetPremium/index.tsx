import React, { memo } from 'react';
import { View, Text } from 'react-native';
import getStyles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

import RectButton from '~/components/Buttons/RectButton';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';
import IAP from '~/utils/IAP';

const advantages = [
  'Escute rádios do mundo inteiro',
  'Áudio de alta qualidade',
  'Ouça quando quiser',
  'Sem anúncios',
  ,
];

const GetPremium = () => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View>
      <Text style={[styles.title]}>
        Experimente o premium de graça por 1 mês
      </Text>

      <View style={styles.advantages}>
        {advantages.map((advantage) => (
          <View style={[styles.advantageCard]} key={advantage}>
            <Icon name="checkcircle" color={palette.app} size={22} />
            <Text style={[styles.advantageTitle]}>{advantage}</Text>
          </View>
        ))}
      </View>

      <View style={styles.containerBottom}>
        <RectButton
          title={'Seja Premium'}
          onPress={() => IAP.requestSubscription('mensal_sub')}
          containerStyle={{ backgroundColor: palette.app }}
        />

        <Text style={styles.price}>R$ 1,99/mês</Text>
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default memo(GetPremium);
