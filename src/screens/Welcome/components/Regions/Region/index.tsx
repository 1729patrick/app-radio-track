import React from 'react';
import { Image, View, Text } from 'react-native';
import { RegionType } from '~/screens/Explore/components/Regions';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Region: React.FC<RegionType> = ({
  image,
  title,
  checked,
  id,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(id)}
      style={[
        styles.container,
        {
          backgroundColor: checked ? StyleGuide.palette.border : undefined,
        },
      ]}>
      <View style={styles.info}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {checked && (
        <Icon
          name="ios-checkmark"
          size={28}
          color={StyleGuide.palette.primary}
        />
      )}
    </TouchableWithoutFeedback>
  );
};

export default Region;
