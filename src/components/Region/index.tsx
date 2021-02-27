import React, { memo } from 'react';
import { Image, View, Text } from 'react-native';
import { RegionType } from '~/screens/Explore/components/Regions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import getStyles from './styles';

import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type RegionProps = RegionType & {
  checked: boolean;
  onPress: (id: string) => void;
  disabled?: boolean;
};

const Region: React.FC<RegionProps> = ({
  image,
  title,
  checked,
  id,
  onPress,
  disabled,
}) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <RectButton
      enabled={!disabled}
      onPress={() => onPress(id)}
      rippleColor={palette.secondary}
      style={[styles.container, disabled ? styles.disabled : {}]}>
      <View style={[styles.info]}>
        <Image source={image} style={styles.image} />
        <Text style={[styles.title]}>{title}</Text>
      </View>
      {!checked && (
        <Icon
          name={'checkbox-blank-circle-outline'}
          size={24}
          color={palette.primary}
          style={styles.checkbox}
        />
      )}

      {checked && (
        <Icon
          name={'checkbox-marked-circle'}
          size={24}
          color={palette.app}
          style={styles.checkbox}
        />
      )}
    </RectButton>
  );
};

export default memo(Region);
