import React from 'react';
import { Image, View, Text } from 'react-native';
import { RegionType } from '~/screens/Explore/components/Regions';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import { RectButton } from 'react-native-gesture-handler';

type RegionProps = RegionType & {
  checked: boolean;
  onPress: (id: string) => void;
};

const Region: React.FC<RegionProps> = ({
  image,
  title,
  checked,
  id,
  onPress,
}) => {
  return (
    <RectButton
      onPress={() => onPress(id)}
      rippleColor={StyleGuide.palette.secondary}
      style={[styles.container]}>
      <View style={styles.info}>
        <Image source={image} style={styles.image} />
        <Text
          style={[
            styles.title,
            {
              color: checked
                ? StyleGuide.palette.app
                : StyleGuide.palette.primary,
            },
          ]}>
          {title}
        </Text>
      </View>
      {checked && (
        <Icon name="check" size={28} color={StyleGuide.palette.app} />
      )}
    </RectButton>
  );
};

export default Region;
