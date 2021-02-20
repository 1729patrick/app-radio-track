import React, { memo } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import StyleGuide from '~/utils/StyleGuide';
import RectButton from '~/components/Buttons/RectButton';

const advantages = [
  'Ouça sem propagandas',
  'Áudio de alta qualidade',
  'Escute qualquer rádio',
];

const GetPremium = () => {
  return (
    <View>
      <Text style={[styles.title]}>
        Experimente o premium de graça por 1 mês
      </Text>

      <View style={styles.advantages}>
        {advantages.map((advantage) => (
          <View style={[styles.advantageCard]} key={advantage}>
            <Icon name="checkcircle" color={StyleGuide.palette.app} size={22} />
            <Text style={[styles.advantageTitle]}>{advantage}</Text>
          </View>
        ))}
      </View>

      <View style={styles.containerBottom}>
        <RectButton
          title={'Seja Premium'}
          onPress={() => {}}
          containerStyle={{ backgroundColor: StyleGuide.palette.app }}
        />
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default memo(GetPremium);
