import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { IconProps } from 'react-native-vector-icons/Icon';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';
import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyles from './styles';

type ItemProps = {
  title: string;
  onPress: () => void;
  Icon: React.ElementType<IconProps>;
  icon: string;
  description?: string;
  checked?: boolean;
  showCheck?: boolean;
};

const Item: React.FC<ItemProps> = ({
  title,
  onPress,
  Icon,
  icon,
  description,
  checked = false,
  showCheck = false,
}) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <RectButton
      key={title}
      style={styles.container}
      rippleColor={palette.secondary}
      onPress={onPress}>
      <Icon name={icon} size={22} color={palette.primary} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      {showCheck && !checked && (
        <IconMD
          name={'checkbox-blank-circle-outline'}
          size={24}
          color={palette.primary}
          style={styles.checkbox}
        />
      )}

      {showCheck && checked && (
        <IconMD
          name={'checkbox-marked-circle'}
          size={24}
          color={palette.app}
          style={styles.checkbox}
        />
      )}
    </RectButton>
  );
};

export default Item;
