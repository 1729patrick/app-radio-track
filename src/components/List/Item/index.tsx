import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { IconProps } from 'react-native-vector-icons/Icon';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

type ItemProps = {
  title: string;
  onPress: () => void;
  Icon: React.ElementType<IconProps>;
  icon: string;
  description?: string;
};

const Item: React.FC<ItemProps> = ({
  title,
  onPress,
  Icon,
  icon,
  description,
}) => {
  return (
    <RectButton
      key={title}
      style={styles.container}
      rippleColor={StyleGuide.palette.secondary}
      onPress={onPress}>
      <Icon name={icon} size={22} color={StyleGuide.palette.primary} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </RectButton>
  );
};

export default Item;
